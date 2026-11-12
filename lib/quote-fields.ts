/**
 * Shared quote-form rules. Safe to import from the browser: no secrets,
 * no mail configuration, no network calls.
 */

export const PHOTO_MAX_BYTES = 4 * 1024 * 1024;
export const PHOTO_MIN_BYTES = 128;
export const MESSAGE_MIN = 10;
export const MESSAGE_MAX = 2000;
export const NAME_MAX = 80;
export const SUBURB_MAX = 80;

export const quoteMessages = {
  name: "Enter your name.",
  phone: "Enter an Australian phone number.",
  email: "Enter a valid email address.",
  suburb: "Enter your suburb.",
  message: "Tell us what needs doing (at least a sentence).",
  photoType: "Use a JPG, PNG, WEBP or HEIC photo.",
  photoSize:
    "That photo is over 4 MB. Send a smaller one, or leave it off and text it to us.",
  photoCount: "Send one photo only.",
  photoRead:
    "We couldn’t read that photo. Try a JPG, PNG, WEBP or HEIC, or leave it off.",
  checkFields: "Please check the highlighted fields and try again.",
  unavailable:
    "The quote form is temporarily unavailable. Please call or text us and we’ll sort it.",
  tooMany:
    "Too many enquiries from this connection. Please wait a few minutes, or call or text us.",
  origin: "Send your enquiry from the quote form on our website, or call or text us.",
  unreadable: "We couldn’t read that submission. Please try again.",
  sendFailed:
    "We couldn’t send your enquiry just now. Please try again, or call or text us.",
  tooLarge:
    "That upload is too large. Please send one photo under 4 MB, or leave it off and text it to us.",
  network:
    "We couldn’t send your enquiry just now. Check your connection and try again, or call or text us.",
} as const;

export type QuoteField = "name" | "phone" | "email" | "suburb" | "message" | "photo";

export type FieldErrors = Partial<Record<QuoteField, string>>;

export type QuoteTextInput = {
  name: string;
  phone: string;
  email: string;
  suburb: string;
  message: string;
  page?: string;
};

export type ValidQuoteText = {
  name: string;
  phone: string;
  email: string;
  suburb: string;
  message: string;
  page?: string;
};

const NAME_PATTERN = /^[\p{L}][\p{L}\u2019'’. -]{0,78}[\p{L}.]$/u;
const SUBURB_PATTERN = /^[\p{L}][\p{L}\u2019'’. -]{0,78}[\p{L}.]$/u;
const DECLARED_PHOTO_TYPES = new Set([
  "",
  "image/jpeg",
  "image/jpg",
  "image/pjpeg",
  "image/png",
  "image/webp",
  "image/heic",
  "image/heif",
  "image/heic-sequence",
  "image/heif-sequence",
  "application/octet-stream",
]);
const HEIF_BRANDS = new Set([
  "heic",
  "heix",
  "hevc",
  "hevx",
  "heim",
  "heis",
  "mif1",
  "msf1",
]);

export type DetectedImage = {
  mime: "image/jpeg" | "image/png" | "image/webp" | "image/heic";
  ext: "jpg" | "png" | "webp" | "heic";
};

function tidyLine(value: string): string {
  return value.replace(/[\u0000-\u001f\u007f]/g, "").trim().replace(/\s+/g, " ");
}

export function isEmail(value: string): boolean {
  if (value.length < 6 || value.length > 254) return false;
  if (/[\s<>()[\],;:\\"]/.test(value)) return false;
  const at = value.indexOf("@");
  if (at <= 0 || at !== value.lastIndexOf("@")) return false;
  const local = value.slice(0, at);
  const domain = value.slice(at + 1);
  if (local.length > 64) return false;
  if (local.startsWith(".") || local.endsWith(".") || local.includes("..")) return false;
  if (!/^[A-Z0-9._%+-]+$/i.test(local)) return false;
  if (!/^(?:[A-Z0-9](?:[A-Z0-9-]{0,61}[A-Z0-9])?\.)+[A-Z]{2,}$/i.test(domain)) {
    return false;
  }
  return true;
}

/** Australian mobiles and geographic numbers, stored as 0X XXXX XXXX / 04XX XXX XXX. */
export function normaliseAuPhone(input: string): string | null {
  const compact = input.trim().replace(/[\s().-]/g, "");
  if (!/^\+?\d{9,15}$/.test(compact)) return null;
  let national = compact.startsWith("+") ? compact.slice(1) : compact;
  if (national.startsWith("61")) national = `0${national.slice(2)}`;
  if (!/^0[23478]\d{8}$/.test(national)) return null;
  if (national.startsWith("04")) {
    return `${national.slice(0, 4)} ${national.slice(4, 7)} ${national.slice(7)}`;
  }
  return `${national.slice(0, 2)} ${national.slice(2, 6)} ${national.slice(6)}`;
}

export function cleanPagePath(value: string | undefined): string | undefined {
  if (!value) return undefined;
  const trimmed = value.trim();
  if (trimmed.length < 1 || trimmed.length > 180) return undefined;
  if (!trimmed.startsWith("/") || trimmed.startsWith("//")) return undefined;
  if (trimmed.includes("://") || trimmed.includes("\\")) return undefined;
  if (/[^\x21-\x7E]/.test(trimmed)) return undefined;
  return trimmed;
}

export function parseQuoteText(
  input: QuoteTextInput,
): { ok: true; value: ValidQuoteText } | { ok: false; fields: FieldErrors } {
  const fields: FieldErrors = {};
  const name = tidyLine(input.name);
  const phone = normaliseAuPhone(input.phone);
  const email = tidyLine(input.email);
  const suburb = tidyLine(input.suburb);
  const message = input.message.replace(/\r\n/g, "\n").replace(/\r/g, "\n").trim();

  if (name.length < 2 || name.length > NAME_MAX || !NAME_PATTERN.test(name)) {
    fields.name = quoteMessages.name;
  }
  if (!phone) fields.phone = quoteMessages.phone;
  if (!isEmail(email)) fields.email = quoteMessages.email;
  if (suburb.length < 2 || suburb.length > SUBURB_MAX || !SUBURB_PATTERN.test(suburb)) {
    fields.suburb = quoteMessages.suburb;
  }
  if (message.length < MESSAGE_MIN || message.length > MESSAGE_MAX || /[\u0000-\u0008\u000b\u000c\u000e-\u001f]/.test(message)) {
    fields.message = quoteMessages.message;
  }

  if (Object.keys(fields).length > 0) return { ok: false, fields };

  const page = cleanPagePath(input.page);
  return {
    ok: true,
    value: {
      name,
      phone: phone as string,
      email,
      suburb,
      message,
      ...(page ? { page } : {}),
    },
  };
}

function ascii(bytes: Uint8Array, start: number, length: number): string {
  let out = "";
  for (let i = 0; i < length; i += 1) {
    out += String.fromCharCode(bytes[start + i] ?? 0);
  }
  return out;
}

export function detectImage(bytes: Uint8Array): DetectedImage | null {
  if (bytes.length < PHOTO_MIN_BYTES) return null;
  if (bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff) {
    return { mime: "image/jpeg", ext: "jpg" };
  }
  if (
    bytes[0] === 0x89 &&
    bytes[1] === 0x50 &&
    bytes[2] === 0x4e &&
    bytes[3] === 0x47 &&
    bytes[4] === 0x0d &&
    bytes[5] === 0x0a &&
    bytes[6] === 0x1a &&
    bytes[7] === 0x0a
  ) {
    return { mime: "image/png", ext: "png" };
  }
  if (ascii(bytes, 0, 4) === "RIFF" && ascii(bytes, 8, 4) === "WEBP") {
    return { mime: "image/webp", ext: "webp" };
  }
  if (ascii(bytes, 4, 4) === "ftyp" && HEIF_BRANDS.has(ascii(bytes, 8, 4))) {
    return { mime: "image/heic", ext: "heic" };
  }
  return null;
}

function declaredMatches(declared: string, detected: DetectedImage): boolean {
  if (declared === "" || declared === "application/octet-stream") return true;
  if ((declared === "image/jpg" || declared === "image/pjpeg") && detected.mime === "image/jpeg") {
    return true;
  }
  if (declared.startsWith("image/heic") || declared.startsWith("image/heif")) {
    return detected.mime === "image/heic";
  }
  return declared === detected.mime;
}

export function safePhotoFilename(original: string, ext: DetectedImage["ext"]): string {
  const leaf = original.split(/[/\\]/).pop() ?? "";
  const stem = leaf.replace(/\.[^.]+$/, "");
  const cleaned = stem
    .normalize("NFKD")
    .replace(/[^a-zA-Z0-9_-]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 48);
  return `${cleaned || "photo"}.${ext}`;
}

export type PhotoAttachment = {
  filename: string;
  contentType: DetectedImage["mime"];
  bytes: Uint8Array;
};

export function photoErrorForBytes(input: {
  size: number;
  type: string;
  name: string;
  bytes: Uint8Array;
}): { error: string } | { photo: PhotoAttachment } | { empty: true } {
  if (input.size === 0) return { empty: true };
  if (input.size > PHOTO_MAX_BYTES || input.bytes.byteLength > PHOTO_MAX_BYTES) {
    return { error: quoteMessages.photoSize };
  }
  const declared = input.type.toLowerCase().split(";")[0]?.trim() ?? "";
  if (!DECLARED_PHOTO_TYPES.has(declared)) return { error: quoteMessages.photoType };
  const detected = detectImage(input.bytes);
  if (!detected || !declaredMatches(declared, detected)) {
    return { error: input.bytes.byteLength < PHOTO_MIN_BYTES ? quoteMessages.photoRead : quoteMessages.photoType };
  }
  return {
    photo: {
      filename: safePhotoFilename(input.name, detected.ext),
      contentType: detected.mime,
      bytes: input.bytes,
    },
  };
}

export async function photoErrorForFile(
  file: File,
): Promise<{ error: string } | { photo: PhotoAttachment } | { empty: true }> {
  if (file.size === 0) return { empty: true };
  if (file.size > PHOTO_MAX_BYTES) return { error: quoteMessages.photoSize };
  const bytes = new Uint8Array(await file.arrayBuffer());
  return photoErrorForBytes({ size: file.size, type: file.type, name: file.name, bytes });
}

const FIELD_KEYS: readonly QuoteField[] = ["name", "phone", "email", "suburb", "message", "photo"];

/** Drop anything that isn't one of our short field messages before showing it. */
export function readFieldErrors(value: unknown): FieldErrors {
  if (!value || typeof value !== "object") return {};
  const source = value as Record<string, unknown>;
  const fields: FieldErrors = {};
  for (const key of FIELD_KEYS) {
    const message = source[key];
    if (typeof message === "string" && message.length > 0 && message.length <= 300) {
      fields[key] = message;
    }
  }
  return fields;
}
