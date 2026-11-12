import assert from "node:assert/strict";
import { beforeEach, describe, test } from "node:test";
import {
  MAX_BODY_BYTES,
  buildQuoteHtml,
  buildQuoteText,
  clientIp,
  consumeRateLimit,
  formatSubmittedAt,
  handleQuoteRequest,
  isBodyTooLarge,
  isSameOrigin,
  readQuoteMailConfig,
  resetRateLimitForTests,
  type QuoteEnquiry,
} from "./quote";
import {
  detectImage,
  normaliseAuPhone,
  parseQuoteText,
  photoErrorForBytes,
  quoteMessages,
} from "./quote-fields";

const submittedAt = new Date("2026-11-12T00:58:00.000Z");

const mailEnv = {
  MAILGUN_API_KEY: "key-test",
  MAILGUN_DOMAIN: "mg.example.com",
  MAILGUN_FROM: "Redfern Plastering <quotes@mg.example.com>",
  QUOTE_TO_EMAIL: "tim@example.com",
};

const validFields = {
  name: "Alex Nguyen",
  phone: "0425 743 992",
  email: "alex@example.com",
  suburb: "West End",
  message: "Crack above the hallway door, about a metre long.",
};

function pad(bytes: number[]): Uint8Array<ArrayBuffer> {
  const buffer = new ArrayBuffer(160);
  const out = new Uint8Array(buffer);
  out.set(bytes);
  return out;
}

function jpegFile(name = "hallway crack.jpg"): File {
  return new File([pad([0xff, 0xd8, 0xff, 0x00])], name, { type: "image/jpeg" });
}

function quoteRequest(
  fields: Record<string, string>,
  options?: {
    ip?: string;
    origin?: string;
    url?: string;
    photo?: File;
    honeypot?: string;
    accept?: string;
    headers?: Headers;
  },
): Request {
  const form = new FormData();
  for (const [key, value] of Object.entries(fields)) form.set(key, value);
  if (options?.honeypot) form.set("rf_hp", options.honeypot);
  if (options?.photo) form.set("photo", options.photo);
  const headers =
    options?.headers ??
    new Headers({
      origin: options?.origin ?? "https://www.redfernplasteringsolutions.com.au",
      "x-real-ip": options?.ip ?? `198.51.100.${Math.floor(Math.random() * 200) + 1}`,
    });
  if (options?.accept) headers.set("accept", options.accept);
  return new Request(options?.url ?? "https://www.redfernplasteringsolutions.com.au/api/quote", {
    method: "POST",
    headers,
    body: form,
  });
}

beforeEach(() => {
  resetRateLimitForTests();
});

describe("quote fields", () => {
  test("accepts Australian phone formats and rejects others", () => {
    assert.equal(normaliseAuPhone("0425 743 992"), "0425 743 992");
    assert.equal(normaliseAuPhone("+61 425 743 992"), "0425 743 992");
    assert.equal(normaliseAuPhone("07 3333 4444"), "07 3333 4444");
    assert.equal(normaliseAuPhone("(02) 5550 1234"), "02 5550 1234");
    assert.equal(normaliseAuPhone("+1 415 555 2671"), null);
    assert.equal(normaliseAuPhone("12345"), null);
  });

  test("requires every text field and keeps a cleaned value", () => {
    const parsed = parseQuoteText({ ...validFields, name: "  Alex   Nguyen " });
    assert.equal(parsed.ok, true);
    if (parsed.ok) assert.equal(parsed.value.name, "Alex Nguyen");

    const missing = parseQuoteText({ ...validFields, email: "not-an-email", message: "too short" });
    assert.equal(missing.ok, false);
    if (!missing.ok) {
      assert.equal(missing.fields.email, quoteMessages.email);
      assert.equal(missing.fields.message, quoteMessages.message);
    }
  });

  test("drops page values that are not a local path", () => {
    const safe = parseQuoteText({ ...validFields, page: "/services/plaster-repairs" });
    assert.equal(safe.ok && safe.value.page, "/services/plaster-repairs");
    const dropped = parseQuoteText({ ...validFields, page: "https://evil.example/phish" });
    assert.equal(dropped.ok && dropped.value.page, undefined);
  });

  test("accepts jpeg, png, webp and heic, and rejects a renamed gif", () => {
    assert.equal(detectImage(pad([0xff, 0xd8, 0xff]))?.ext, "jpg");
    assert.equal(detectImage(pad([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]))?.ext, "png");
    const webp = pad([]);
    webp.set([0x52, 0x49, 0x46, 0x46], 0);
    webp.set([0x57, 0x45, 0x42, 0x50], 8);
    assert.equal(detectImage(webp)?.ext, "webp");
    const heic = pad([]);
    heic.set([0x66, 0x74, 0x79, 0x70, 0x68, 0x65, 0x69, 0x63], 4);
    assert.equal(detectImage(heic)?.mime, "image/heic");

    const gif = pad([0x47, 0x49, 0x46, 0x38, 0x39, 0x61]);
    const spoofed = photoErrorForBytes({
      size: gif.byteLength,
      type: "image/jpeg",
      name: "crack.jpg",
      bytes: gif,
    });
    assert.equal("error" in spoofed && spoofed.error, quoteMessages.photoType);
  });
});

describe("mail configuration", () => {
  test("returns null unless all four variables are usable", () => {
    assert.equal(readQuoteMailConfig({}), null);
    assert.equal(readQuoteMailConfig({ ...mailEnv, QUOTE_TO_EMAIL: "" }), null);
    assert.equal(readQuoteMailConfig({ ...mailEnv, MAILGUN_DOMAIN: "not a domain" }), null);
    assert.equal(readQuoteMailConfig({ ...mailEnv, MAILGUN_FROM: "quotes@mg.example.com\nBcc: x" }), null);
    const config = readQuoteMailConfig(mailEnv);
    assert.equal(config?.apiBase, "https://api.mailgun.net");
    assert.equal(config?.to, "tim@example.com");
  });

  test("allows the EU host and a loopback base, and rejects other http hosts", () => {
    assert.equal(
      readQuoteMailConfig({ ...mailEnv, MAILGUN_API_BASE: "https://api.eu.mailgun.net/" })?.apiBase,
      "https://api.eu.mailgun.net",
    );
    assert.equal(
      readQuoteMailConfig({ ...mailEnv, MAILGUN_API_BASE: "http://127.0.0.1:4010" })?.apiBase,
      "http://127.0.0.1:4010",
    );
    assert.equal(readQuoteMailConfig({ ...mailEnv, MAILGUN_API_BASE: "http://evil.example" }), null);
  });
});

describe("POST /api/quote", () => {
  test("returns a generic 503 when mail is not configured", async () => {
    const response = await handleQuoteRequest(quoteRequest(validFields), {});
    const body = await response.json();
    assert.equal(response.status, 503);
    assert.equal(body.error, quoteMessages.unavailable);
    assert.equal(JSON.stringify(body).includes("MAILGUN"), false);
    assert.equal(JSON.stringify(body).includes("QUOTE_TO"), false);
  });

  test("rejects a cross-site post and a body that is too large", async () => {
    const crossSite = await handleQuoteRequest(
      quoteRequest(validFields, { origin: "https://evil.example", ip: "203.0.113.10" }),
      mailEnv,
    );
    assert.equal(crossSite.status, 403);

    const oversized = {
      url: "https://www.redfernplasteringsolutions.com.au/api/quote",
      headers: new Headers({
        origin: "https://www.redfernplasteringsolutions.com.au",
        "x-real-ip": "203.0.113.11",
        "content-length": String(MAX_BODY_BYTES + 10),
      }),
      formData: async () => {
        throw new Error("body should not be read");
      },
    } as unknown as Request;
    const tooBig = await handleQuoteRequest(oversized, mailEnv);
    assert.equal(tooBig.status, 413);
    assert.equal(isBodyTooLarge(String(MAX_BODY_BYTES + 1)), true);
  });

  test("honeypot returns success and does not call Mailgun", async () => {
    let called = false;
    const response = await handleQuoteRequest(
      quoteRequest(validFields, { honeypot: "https://spam.example", ip: "203.0.113.12" }),
      mailEnv,
      async () => {
        called = true;
        return new Response("nope", { status: 500 });
      },
    );
    assert.equal(response.status, 200);
    assert.equal((await response.json()).ok, true);
    assert.equal(called, false);
  });

  test("returns field errors and keeps going only after a valid post", async () => {
    let called = false;
    const invalid = await handleQuoteRequest(
      quoteRequest({ ...validFields, email: "alex@", phone: "123" }, { ip: "203.0.113.13" }),
      mailEnv,
      async () => {
        called = true;
        return new Response("{}", { status: 200 });
      },
    );
    const body = await invalid.json();
    assert.equal(invalid.status, 400);
    assert.equal(body.fields.email, quoteMessages.email);
    assert.equal(body.fields.phone, quoteMessages.phone);
    assert.equal(called, false);
  });

  test("posts the enquiry to Mailgun with Reply-To, the fields, and the photo", async () => {
    let captured: { url: string; init: RequestInit } | undefined;
    const response = await handleQuoteRequest(
      quoteRequest(
        { ...validFields, page: "/services/plaster-repairs" },
        { photo: jpegFile(), ip: "203.0.113.14" },
      ),
      mailEnv,
      async (url, init) => {
        captured = { url: String(url), init: init ?? {} };
        return new Response(JSON.stringify({ id: "<test>", message: "Queued. Thank you." }), { status: 200 });
      },
      submittedAt,
    );
    assert.equal(response.status, 200);
    assert.ok(captured);
    assert.equal(captured?.url, "https://api.mailgun.net/v3/mg.example.com/messages");
    const headers = captured?.init.headers as { Authorization: string };
    assert.equal(headers.Authorization, `Basic ${Buffer.from("api:key-test").toString("base64")}`);
    assert.equal(captured?.init.redirect, "manual");
    const form = captured?.init.body as FormData;
    assert.equal(form.get("to"), "tim@example.com");
    assert.equal(form.get("h:Reply-To"), "alex@example.com");
    assert.equal(form.get("from"), mailEnv.MAILGUN_FROM);
    const text = String(form.get("text"));
    assert.match(text, /Alex Nguyen/);
    assert.match(text, /0425 743 992/);
    assert.match(text, /West End/);
    assert.match(text, /hallway door/);
    assert.match(text, /\/services\/plaster-repairs/);
    assert.match(text, /12 November 2026/);
    assert.match(text, /10:58/);
    assert.match(text, /Australia\/Brisbane/);
    const html = String(form.get("html"));
    assert.equal(html.includes("<script>"), false);
    const attachment = form.get("attachment");
    assert.ok(attachment instanceof File);
    assert.equal(attachment.name, "hallway-crack.jpg");
    assert.equal(JSON.stringify(await response.json()).includes("key-test"), false);
  });

  test("escapes HTML in the message body", () => {
    const quote: QuoteEnquiry = {
      ...validFields,
      phone: "0425 743 992",
      message: "<script>alert(1)</script>",
      submittedAt,
    };
    assert.match(buildQuoteText(quote), /<script>alert/);
    assert.equal(buildQuoteHtml(quote).includes("<script>"), false);
    assert.match(buildQuoteHtml(quote), /&lt;script&gt;/);
  });

  test("a provider failure is a generic 502 and does not echo the provider body", async () => {
    const response = await handleQuoteRequest(
      quoteRequest(validFields, { ip: "203.0.113.15" }),
      mailEnv,
      async () => new Response("Invalid private key key-test for domain mg.example.com", { status: 401 }),
    );
    const raw = await response.text();
    assert.equal(response.status, 502);
    assert.equal(raw.includes("key-test"), false);
    assert.equal(raw.includes("mg.example.com"), false);
    assert.equal(raw.includes("401"), false);
    assert.match(raw, /couldn/);
  });

  test("rate limits the sixth post from the same address", async () => {
    const ip = "203.0.113.16";
    const fetchImpl: typeof fetch = async () => new Response("{}", { status: 200 });
    for (let i = 0; i < 5; i += 1) {
      const response = await handleQuoteRequest(quoteRequest(validFields, { ip }), mailEnv, fetchImpl);
      assert.equal(response.status, 200);
    }
    const blocked = await handleQuoteRequest(quoteRequest(validFields, { ip }), mailEnv, fetchImpl);
    assert.equal(blocked.status, 429);
    assert.match(blocked.headers.get("retry-after") ?? "", /^[1-9]/);
  });

  test("same-origin allows the public site, localhost, and the forwarded host", () => {
    assert.equal(isSameOrigin(quoteRequest(validFields)), true);
    assert.equal(
      isSameOrigin(
        quoteRequest(validFields, {
          url: "http://localhost:3000/api/quote",
          origin: "http://localhost:3000",
        }),
      ),
      true,
    );
    const forwarded = quoteRequest(validFields, {
      url: "http://127.0.0.1:3000/api/quote",
      headers: new Headers({
        origin: "https://preview.example.com",
        "x-forwarded-host": "preview.example.com",
        "x-real-ip": "203.0.113.17",
      }),
    });
    assert.equal(isSameOrigin(forwarded), true);
    assert.equal(clientIp(forwarded), "203.0.113.17");
  });

  test("a browser navigation without JavaScript gets an HTML confirmation", async () => {
    const response = await handleQuoteRequest(
      quoteRequest(validFields, { accept: "text/html", ip: "203.0.113.18" }),
      mailEnv,
      async () => new Response("{}", { status: 200 }),
    );
    assert.equal(response.status, 200);
    assert.match(response.headers.get("content-type") ?? "", /text\/html/);
    const html = await response.text();
    assert.match(html, /Enquiry sent/);
    assert.equal(html.includes("tim@example.com"), false);
  });

  test("formatSubmittedAt is in Brisbane time", () => {
    const formatted = formatSubmittedAt(submittedAt);
    assert.match(formatted, /12 November 2026/);
    assert.match(formatted, /10:58/);
    assert.match(formatted, /Australia\/Brisbane/);
  });

  test("consumeRateLimit opens the window again after it expires", () => {
    const start = Date.parse("2026-11-12T00:00:00.000Z");
    for (let i = 0; i < 5; i += 1) assert.equal(consumeRateLimit("window", start).ok, true);
    assert.equal(consumeRateLimit("window", start + 1000).ok, false);
    assert.equal(consumeRateLimit("window", start + 10 * 60 * 1000 + 1).ok, true);
  });
});
