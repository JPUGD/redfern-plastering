/**
 * Server-side quote delivery. Do not import this from client components.
 * Destination addresses and the Mailgun key are read from the environment
 * at request time and are never returned to the browser.
 */

import {
  photoErrorForFile,
  quoteMessages,
  readFieldErrors,
  type FieldErrors,
  type PhotoAttachment,
  type ValidQuoteText,
  parseQuoteText,
  cleanPagePath,
} from "./quote-fields";

export const MAX_BODY_BYTES = 5 * 1024 * 1024;
export const RATE_LIMIT_MAX = 5;
export const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;

const HONEYPOT_FIELD = "rf_hp";
const DEFAULT_API_BASE = "https://api.mailgun.net";

/** Only the variables this route reads. Kept loose so tests can pass a partial env. */
export type QuoteEnv = {
  [key: string]: string | undefined;
};

export type QuoteMailConfig = {
  apiKey: string;
  domain: string;
  from: string;
  to: string;
  apiBase: string;
};

export type QuoteEnquiry = ValidQuoteText & {
  photo?: PhotoAttachment;
  submittedAt: Date;
};

type Bucket = number[];

const buckets = new Map<string, Bucket>();

export function resetRateLimitForTests(): void {
  buckets.clear();
}

export function clientIp(request: Request): string {
  const real = request.headers.get("x-real-ip")?.trim();
  if (real && !/[\r\n]/.test(real)) return real.slice(0, 80);
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    const first = forwarded.split(",")[0]?.trim() ?? "";
    if (first && !/[\r\n]/.test(first)) return first.slice(0, 80);
  }
  return "unknown";
}

export function consumeRateLimit(
  key: string,
  now = Date.now(),
): { ok: true } | { ok: false; retryAfterSeconds: number } {
  const recent = (buckets.get(key) ?? []).filter((stamp) => now - stamp < RATE_LIMIT_WINDOW_MS);
  if (recent.length >= RATE_LIMIT_MAX) {
    buckets.set(key, recent);
    const retryAfterSeconds = Math.max(1, Math.ceil((RATE_LIMIT_WINDOW_MS - (now - recent[0])) / 1000));
    return { ok: false, retryAfterSeconds };
  }
  recent.push(now);
  buckets.set(key, recent);
  if (buckets.size > 5000) {
    const oldest = buckets.keys().next().value;
    if (oldest) buckets.delete(oldest);
  }
  return { ok: true };
}

export function isBodyTooLarge(contentLength: string | null): boolean {
  if (!contentLength) return false;
  const size = Number(contentLength);
  return Number.isFinite(size) && size > MAX_BODY_BYTES;
}

function isSafeMailbox(value: string): boolean {
  if (value.length < 6 || value.length > 200 || /[\r\n]/.test(value)) return false;
  const wrapped = value.match(/^(?:[\p{L}\p{N} .'_-]{1,80} )?<?([^<>\s]+)>?$/u);
  if (!wrapped) return false;
  const address = wrapped[1];
  return /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(address);
}

function normaliseApiBase(raw: string | undefined): string | null {
  const value = (raw?.trim() || DEFAULT_API_BASE).replace(/\/+$/, "");
  let url: URL;
  try {
    url = new URL(value);
  } catch {
    return null;
  }
  if (url.username || url.password || url.search || url.hash || url.pathname !== "/") return null;
  const loopback = url.hostname === "localhost" || url.hostname === "127.0.0.1";
  if (url.protocol === "https:") return url.origin;
  if (url.protocol === "http:" && loopback) return url.origin;
  return null;
}

/**
 * Requires MAILGUN_API_KEY, MAILGUN_DOMAIN, MAILGUN_FROM and QUOTE_TO_EMAIL.
 * MAILGUN_API_BASE is optional (defaults to https://api.mailgun.net).
 * Returns null when configuration is missing or unusable.
 */
export function readQuoteMailConfig(env: QuoteEnv): QuoteMailConfig | null {
  const apiKey = env.MAILGUN_API_KEY?.trim() ?? "";
  const domain = env.MAILGUN_DOMAIN?.trim() ?? "";
  const from = env.MAILGUN_FROM?.trim() ?? "";
  const to = env.QUOTE_TO_EMAIL?.trim() ?? "";
  if (!apiKey || !domain || !from || !to) return null;
  if (apiKey.length > 200 || /[\s]/.test(apiKey)) return null;
  if (!/^(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z]{2,}$/i.test(domain)) return null;
  if (!isSafeMailbox(from)) return null;
  const recipients = to.split(",").map((part) => part.trim()).filter(Boolean);
  if (recipients.length === 0 || recipients.length > 5) return null;
  if (!recipients.every((address) => isSafeMailbox(address) && !address.includes("<"))) return null;
  const apiBase = normaliseApiBase(env.MAILGUN_API_BASE);
  if (!apiBase) return null;
  return { apiKey, domain, from, to: recipients.join(", "), apiBase };
}

export function isSameOrigin(request: Request): boolean {
  const originHeader = request.headers.get("origin");
  if (!originHeader) return false;
  let origin: URL;
  try {
    origin = new URL(originHeader);
  } catch {
    return false;
  }
  if (origin.protocol !== "https:" && origin.protocol !== "http:") return false;
  const originHost = origin.host.toLowerCase();
  const candidates = new Set<string>();
  try {
    candidates.add(new URL(request.url).host.toLowerCase());
  } catch {
    return false;
  }
  for (const header of ["host", "x-forwarded-host"]) {
    const value = request.headers.get(header);
    if (!value) continue;
    for (const part of value.split(",")) {
      const host = part.trim().toLowerCase();
      if (host) candidates.add(host);
    }
  }
  return candidates.has(originHost);
}

export function formatSubmittedAt(date: Date): string {
  const formatted = new Intl.DateTimeFormat("en-AU", {
    timeZone: "Australia/Brisbane",
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hourCycle: "h12",
    timeZoneName: "short",
  }).format(date);
  return `${formatted} (Australia/Brisbane)`;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export function buildQuoteSubject(quote: QuoteEnquiry): string {
  return `Quote enquiry — ${quote.name.slice(0, 60)} (${quote.suburb.slice(0, 40)})`;
}

export function buildQuoteText(quote: QuoteEnquiry): string {
  const lines = [
    "New quote enquiry for Redfern Plastering Solutions",
    "",
    `Name: ${quote.name}`,
    `Phone: ${quote.phone}`,
    `Email: ${quote.email}`,
    `Suburb: ${quote.suburb}`,
  ];
  if (quote.page) lines.push(`Page: ${quote.page}`);
  lines.push(
    "",
    "What needs doing:",
    quote.message,
    "",
    `Photo: ${quote.photo ? quote.photo.filename : "none"}`,
    "",
    `Submitted: ${formatSubmittedAt(quote.submittedAt)}`,
  );
  return lines.join("\n");
}

export function buildQuoteHtml(quote: QuoteEnquiry): string {
  const row = (label: string, value: string) =>
    `<tr><th align="left" style="padding:4px 16px 4px 0;vertical-align:top;">${escapeHtml(label)}</th><td style="padding:4px 0;">${escapeHtml(value)}</td></tr>`;
  const message = escapeHtml(quote.message).replace(/\n/g, "<br>");
  return [
    "<!DOCTYPE html>",
    '<html lang="en-AU"><body style="font-family:sans-serif;color:#141416;">',
    "<h1>New quote enquiry</h1>",
    "<table>",
    row("Name", quote.name),
    row("Phone", quote.phone),
    row("Email", quote.email),
    row("Suburb", quote.suburb),
    quote.page ? row("Page", quote.page) : "",
    row("Photo", quote.photo ? quote.photo.filename : "none"),
    row("Submitted", formatSubmittedAt(quote.submittedAt)),
    "</table>",
    "<h2>What needs doing</h2>",
    `<p>${message}</p>`,
    "</body></html>",
  ].join("");
}

export async function sendQuoteEmail(
  config: QuoteMailConfig,
  quote: QuoteEnquiry,
  fetchImpl: typeof fetch = fetch,
): Promise<void> {
  const form = new FormData();
  form.set("from", config.from);
  form.set("to", config.to);
  form.set("subject", buildQuoteSubject(quote));
  form.set("text", buildQuoteText(quote));
  form.set("html", buildQuoteHtml(quote));
  form.set("h:Reply-To", quote.email);
  form.set("o:tracking", "no");
  if (quote.photo) {
    const copy = new Uint8Array(quote.photo.bytes.byteLength);
    copy.set(quote.photo.bytes);
    form.append("attachment", new Blob([copy], { type: quote.photo.contentType }), quote.photo.filename);
  }
  const url = `${config.apiBase}/v3/${config.domain}/messages`;
  const response = await fetchImpl(url, {
    method: "POST",
    redirect: "manual",
    headers: {
      Authorization: `Basic ${Buffer.from(`api:${config.apiKey}`).toString("base64")}`,
    },
    body: form,
  });
  if (response.status >= 300 && response.status < 400) {
    console.error("Quote mail provider redirected the request");
    throw new Error("mail-redirect");
  }
  if (!response.ok) {
    console.error(`Quote mail provider returned ${response.status}`);
    throw new Error("mail-rejected");
  }
}

type QuoteResult =
  | { ok: true }
  | { ok: false; status: number; error: string; fields?: FieldErrors; retryAfterSeconds?: number };

function stringField(form: FormData, name: string): string {
  const value = form.get(name);
  return typeof value === "string" ? value : "";
}

async function readEnquiry(form: FormData, submittedAt: Date): Promise<QuoteResult | QuoteEnquiry> {
  const honeypot = form.get(HONEYPOT_FIELD);
  const honeypotFilled = honeypot instanceof File || (typeof honeypot === "string" && honeypot.trim() !== "");
  if (honeypotFilled) return { ok: true };

  const parsed = parseQuoteText({
    name: stringField(form, "name"),
    phone: stringField(form, "phone"),
    email: stringField(form, "email"),
    suburb: stringField(form, "suburb"),
    message: stringField(form, "message"),
    page: cleanPagePath(stringField(form, "page")),
  });
  if (!parsed.ok) {
    return { ok: false, status: 400, error: quoteMessages.checkFields, fields: parsed.fields };
  }

  const photos = form.getAll("photo").filter((entry) => entry instanceof File && entry.size > 0);
  if (photos.length > 1) {
    return {
      ok: false,
      status: 400,
      error: quoteMessages.checkFields,
      fields: { photo: quoteMessages.photoCount },
    };
  }

  let photo: PhotoAttachment | undefined;
  const file = photos[0];
  if (file instanceof File) {
    const read = await photoErrorForFile(file);
    if ("error" in read) {
      return { ok: false, status: 400, error: quoteMessages.checkFields, fields: { photo: read.error } };
    }
    if ("photo" in read) photo = read.photo;
  }

  return { ...parsed.value, ...(photo ? { photo } : {}), submittedAt };
}

function isEnquiry(value: QuoteResult | QuoteEnquiry): value is QuoteEnquiry {
  return "submittedAt" in value && value.submittedAt instanceof Date;
}

function wantsHtml(request: Request): boolean {
  const accept = request.headers.get("accept") ?? "";
  if (accept.includes("application/json")) return false;
  return accept.includes("text/html");
}

function htmlPage(title: string, message: string): string {
  const safeTitle = escapeHtml(title);
  const safeMessage = escapeHtml(message);
  return `<!DOCTYPE html>
<html lang="en-AU">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${safeTitle}</title>
</head>
<body style="margin:0;background:#0b0b0c;color:#f6f5f1;font-family:sans-serif;">
  <main style="max-width:36rem;margin:4rem auto;padding:0 1.5rem;">
    <h1 style="font-size:2rem;letter-spacing:-0.03em;">${safeTitle}</h1>
    <p style="line-height:1.6;color:#f6f5f1cc;">${safeMessage}</p>
    <p><a href="/#contact" style="color:#f6f5f1;">Back to the quote form</a></p>
  </main>
</body>
</html>`;
}

function toResponse(request: Request, result: QuoteResult): Response {
  const headers = new Headers({ "cache-control": "no-store" });
  if (!result.ok && result.retryAfterSeconds) {
    headers.set("retry-after", String(result.retryAfterSeconds));
  }
  if (wantsHtml(request)) {
    headers.set("content-type", "text/html; charset=utf-8");
    const title = result.ok ? "Enquiry sent" : "We couldn’t send that";
    const message = result.ok
      ? "Thanks. Tim has your enquiry and will be in touch. You can close this page."
      : result.error;
    return new Response(htmlPage(title, message), { status: result.ok ? 200 : result.status, headers });
  }
  headers.set("content-type", "application/json; charset=utf-8");
  const body: { ok: boolean; error?: string; fields?: FieldErrors } = result.ok
    ? { ok: true }
    : {
        ok: false,
        error: result.error,
        ...(result.fields && Object.keys(result.fields).length > 0
          ? { fields: readFieldErrors(result.fields) }
          : {}),
      };
  return new Response(JSON.stringify(body), { status: result.ok ? 200 : result.status, headers });
}

export async function handleQuoteRequest(
  request: Request,
  env: QuoteEnv,
  fetchImpl: typeof fetch = fetch,
  now = new Date(),
): Promise<Response> {
  const limit = consumeRateLimit(clientIp(request), now.getTime());
  if (!limit.ok) {
    return toResponse(request, {
      ok: false,
      status: 429,
      error: quoteMessages.tooMany,
      retryAfterSeconds: limit.retryAfterSeconds,
    });
  }

  if (isBodyTooLarge(request.headers.get("content-length"))) {
    return toResponse(request, { ok: false, status: 413, error: quoteMessages.tooLarge });
  }

  const config = readQuoteMailConfig(env);
  if (!config) {
    return toResponse(request, { ok: false, status: 503, error: quoteMessages.unavailable });
  }

  if (!isSameOrigin(request)) {
    return toResponse(request, { ok: false, status: 403, error: quoteMessages.origin });
  }

  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return toResponse(request, { ok: false, status: 400, error: quoteMessages.unreadable });
  }

  const enquiry = await readEnquiry(form, now);
  if (!isEnquiry(enquiry)) return toResponse(request, enquiry);

  try {
    await sendQuoteEmail(config, enquiry, fetchImpl);
  } catch {
    return toResponse(request, { ok: false, status: 502, error: quoteMessages.sendFailed });
  }

  return toResponse(request, { ok: true });
}
