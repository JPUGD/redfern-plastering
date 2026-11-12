"use client";

import { useId, useRef, useState, type FormEvent, type ReactNode } from "react";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";
import {
  parseQuoteText,
  photoErrorForFile,
  quoteMessages,
  readFieldErrors,
  type FieldErrors,
  type QuoteField,
} from "@/lib/quote-fields";

type Status = "idle" | "submitting" | "success" | "error";

const FIELD_ORDER: readonly QuoteField[] = ["name", "phone", "email", "suburb", "message", "photo"];

function inputClass(invalid: boolean) {
  return cn(
    "mt-2 w-full rounded-xl border bg-ink/50 px-4 py-3 text-sm text-paper outline-none transition-colors placeholder:text-paper/30",
    invalid ? "border-paper" : "border-paper/15 focus:border-paper/55",
  );
}

function Field({
  id,
  label,
  hint,
  error,
  className,
  children,
}: {
  id: string;
  label: string;
  hint?: string;
  error?: string;
  className?: string;
  children: ReactNode;
}) {
  const errorId = `${id}-error`;
  const hintId = hint ? `${id}-hint` : undefined;
  return (
    <div className={className}>
      <label htmlFor={id} className="text-[11px] font-semibold uppercase tracking-[0.22em] text-paper/55">
        {label}
      </label>
      {children}
      {hint ? (
        <p id={hintId} className="mt-2 text-[11px] leading-relaxed text-paper/40">
          {hint}
        </p>
      ) : null}
      {error ? (
        <p id={errorId} className="mt-2 text-xs leading-relaxed text-paper">
          {error}
        </p>
      ) : null}
    </div>
  );
}

export function QuoteForm() {
  const baseId = useId();
  const formRef = useRef<HTMLFormElement>(null);
  const sending = useRef(false);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [sentName, setSentName] = useState("");

  function fieldId(name: QuoteField) {
    return `${baseId}-${name}`;
  }

  function focusField(fields: FieldErrors) {
    const key = FIELD_ORDER.find((item) => fields[item]);
    const form = formRef.current;
    if (!key || !form) return;
    form.querySelector<HTMLElement>(`[name="${key}"]`)?.focus();
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (sending.current) return;
    const form = event.currentTarget;
    const data = new FormData(form);
    data.set("page", window.location.pathname.slice(0, 180));

    const parsed = parseQuoteText({
      name: String(data.get("name") ?? ""),
      phone: String(data.get("phone") ?? ""),
      email: String(data.get("email") ?? ""),
      suburb: String(data.get("suburb") ?? ""),
      message: String(data.get("message") ?? ""),
      page: String(data.get("page") ?? ""),
    });
    const nextErrors: FieldErrors = parsed.ok ? {} : { ...parsed.fields };
    const photo = data.get("photo");
    if (photo instanceof File && photo.size > 0) {
      const read = await photoErrorForFile(photo);
      if ("error" in read) nextErrors.photo = read.error;
    }
    if (Object.keys(nextErrors).length > 0) {
      setFieldErrors(nextErrors);
      setError(quoteMessages.checkFields);
      setStatus("error");
      focusField(nextErrors);
      return;
    }

    sending.current = true;
    setStatus("submitting");
    setError(null);
    setFieldErrors({});
    try {
      const response = await fetch("/api/quote", {
        method: "POST",
        headers: { accept: "application/json" },
        body: data,
      });
      const payload: unknown = await response.json().catch(() => null);
      const record =
        payload && typeof payload === "object"
          ? (payload as { ok?: unknown; error?: unknown; fields?: unknown })
          : null;
      if (!response.ok || record?.ok !== true) {
        const fields = readFieldErrors(record?.fields);
        const message =
          typeof record?.error === "string" && record.error.length > 0 && record.error.length <= 300
            ? record.error
            : quoteMessages.sendFailed;
        setFieldErrors(fields);
        setError(message);
        setStatus("error");
        sending.current = false;
        focusField(fields);
        return;
      }
      setSentName(parsed.ok ? parsed.value.name : "");
      setFieldErrors({});
      setError(null);
      setStatus("success");
    } catch {
      setError(quoteMessages.network);
      setStatus("error");
      sending.current = false;
    }
  }

  if (status === "success") {
    return (
      <div role="status" className="rounded-2xl border border-paper/15 bg-ink/40 p-8 sm:p-10">
        <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-paper/50">With Tim</p>
        <h3 className="mt-4 font-display text-4xl font-black uppercase leading-[0.95] tracking-tight text-paper">
          Enquiry sent
        </h3>
        <p className="mt-5 max-w-md text-sm leading-relaxed text-paper/70">
          {sentName ? `Thanks, ${sentName}. ` : "Thanks. "}
          Tim has your enquiry and will be in touch. If it’s urgent, call{" "}
          <a
            href={site.phoneHref}
            className="text-paper underline decoration-paper/30 underline-offset-4 transition-colors hover:decoration-paper"
          >
            {site.phoneDisplay}
          </a>
          .
        </p>
        <button
          type="button"
          className="mt-8 text-[11px] font-semibold uppercase tracking-[0.22em] text-paper/50 underline-offset-4 transition-colors hover:text-paper hover:underline"
          onClick={() => {
            sending.current = false;
            setSentName("");
            setStatus("idle");
          }}
        >
          Send another enquiry
        </button>
      </div>
    );
  }

  return (
    <form
      ref={formRef}
      method="post"
      action="/api/quote"
      encType="multipart/form-data"
      onSubmit={onSubmit}
      noValidate
      aria-busy={status === "submitting"}
      className="relative grid gap-5 sm:grid-cols-2"
    >
      <div className="pointer-events-none absolute h-0 w-0 overflow-hidden opacity-0" aria-hidden="true">
        <label>
          Leave this blank
          <input type="text" name="rf_hp" tabIndex={-1} autoComplete="off" defaultValue="" />
        </label>
      </div>

      <Field id={fieldId("name")} label="Name" error={fieldErrors.name}>
        <input
          id={fieldId("name")}
          name="name"
          type="text"
          autoComplete="name"
          autoCapitalize="words"
          required
          maxLength={80}
          placeholder="Alex Nguyen"
          aria-invalid={fieldErrors.name ? true : undefined}
          aria-describedby={fieldErrors.name ? `${fieldId("name")}-error` : undefined}
          className={inputClass(Boolean(fieldErrors.name))}
        />
      </Field>

      <Field id={fieldId("phone")} label="Phone" error={fieldErrors.phone}>
        <input
          id={fieldId("phone")}
          name="phone"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          required
          maxLength={20}
          placeholder="04xx xxx xxx"
          aria-invalid={fieldErrors.phone ? true : undefined}
          aria-describedby={fieldErrors.phone ? `${fieldId("phone")}-error` : undefined}
          className={inputClass(Boolean(fieldErrors.phone))}
        />
      </Field>

      <Field id={fieldId("email")} label="Email" error={fieldErrors.email}>
        <input
          id={fieldId("email")}
          name="email"
          type="email"
          inputMode="email"
          autoComplete="email"
          autoCapitalize="off"
          required
          maxLength={254}
          placeholder="you@email.com"
          aria-invalid={fieldErrors.email ? true : undefined}
          aria-describedby={fieldErrors.email ? `${fieldId("email")}-error` : undefined}
          className={inputClass(Boolean(fieldErrors.email))}
        />
      </Field>

      <Field id={fieldId("suburb")} label="Suburb" error={fieldErrors.suburb}>
        <input
          id={fieldId("suburb")}
          name="suburb"
          type="text"
          autoComplete="address-level2"
          autoCapitalize="words"
          required
          maxLength={80}
          placeholder="Woolloongabba"
          aria-invalid={fieldErrors.suburb ? true : undefined}
          aria-describedby={fieldErrors.suburb ? `${fieldId("suburb")}-error` : undefined}
          className={inputClass(Boolean(fieldErrors.suburb))}
        />
      </Field>

      <Field
        id={fieldId("message")}
        label="What needs doing"
        error={fieldErrors.message}
        className="sm:col-span-2"
      >
        <textarea
          id={fieldId("message")}
          name="message"
          required
          rows={5}
          maxLength={2000}
          placeholder="Hole in the hallway wall, about the size of a plate. Paint can wait."
          aria-invalid={fieldErrors.message ? true : undefined}
          aria-describedby={fieldErrors.message ? `${fieldId("message")}-error` : undefined}
          className={cn(inputClass(Boolean(fieldErrors.message)), "resize-y")}
        />
      </Field>

      <Field
        id={fieldId("photo")}
        label="Photo"
        hint="Optional. JPG, PNG, WEBP or HEIC, one photo up to 4 MB. A photo helps us quote faster."
        error={fieldErrors.photo}
        className="sm:col-span-2"
      >
        <input
          id={fieldId("photo")}
          name="photo"
          type="file"
          accept="image/jpeg,image/png,image/webp,image/heic,image/heif"
          aria-invalid={fieldErrors.photo ? true : undefined}
          aria-describedby={
            fieldErrors.photo ? `${fieldId("photo")}-error ${fieldId("photo")}-hint` : `${fieldId("photo")}-hint`
          }
          className="mt-2 block w-full text-sm text-paper/70 file:mr-4 file:rounded-full file:border-0 file:bg-paper file:px-4 file:py-2 file:font-display file:text-[11px] file:font-bold file:uppercase file:tracking-[0.16em] file:text-ink"
        />
      </Field>

      <div className="flex flex-col items-start gap-4 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="submit"
          disabled={status === "submitting"}
          className="beam-border inline-flex items-center justify-center rounded-full bg-paper px-7 py-3.5 font-display text-sm font-bold uppercase tracking-[0.18em] text-ink transition-transform duration-300 hover:scale-[1.03] active:scale-[0.98] disabled:cursor-wait disabled:opacity-60 disabled:hover:scale-100"
        >
          {status === "submitting" ? "Sending…" : "Send enquiry"}
        </button>
        {error ? (
          <p role="alert" className="max-w-sm text-sm leading-relaxed text-paper">
            {error}
          </p>
        ) : (
          <p className="max-w-sm text-[11px] leading-relaxed text-paper/40">
            Sent to Tim so he can price the job. We don’t use it for anything else.
          </p>
        )}
      </div>
    </form>
  );
}
