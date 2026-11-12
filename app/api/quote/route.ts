import { handleQuoteRequest } from "@/lib/quote";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Quote enquiries are emailed through the Mailgun Messages API.
 * Required environment variables (never commit the values):
 * MAILGUN_API_KEY, MAILGUN_DOMAIN, MAILGUN_FROM, QUOTE_TO_EMAIL.
 * Optional: MAILGUN_API_BASE (defaults to https://api.mailgun.net;
 * use https://api.eu.mailgun.net when the domain lives in the EU region).
 */
export function POST(request: Request) {
  return handleQuoteRequest(request, process.env);
}
