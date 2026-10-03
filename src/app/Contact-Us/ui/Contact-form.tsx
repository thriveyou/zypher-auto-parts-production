"use client";

import { useRef, useState } from "react";

const whatsappUrl = "https://wa.me/817091117384?text=Hi%20Zypher%20Imports%2C%20I%20need%20help%20with%20vehicle%20parts.";

type Errors = Partial<{
  name: string;
  phone: string;
  message: string;
  attachment: string;
}>;

export default function ContactForm() {
  const [errors, setErrors] = useState<Errors>({});
  const [pending, setPending] = useState(false);
  const [ok, setOk] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const formRef = useRef<HTMLFormElement | null>(null);

  function focusFirstError(form: HTMLFormElement, fieldErrors: Errors) {
    const first = (["name", "phone", "attachment", "message"] as const)
      .find((name) => fieldErrors[name]);
    if (first) form.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
  }

  function validate(form: HTMLFormElement, focusErrors = false) {
    const data = new FormData(form);
    const name = (data.get("name") as string)?.trim();
    const phone = (data.get("phone") as string)?.trim();
    const message = (data.get("message") as string)?.trim();
    const file = data.get("attachment") as File | null;

    const nextErrors: Errors = {};

    if (!name) nextErrors.name = "Name is required.";
    if (!phone) nextErrors.phone = "Contact number is required.";
    else if (!/^[0-9+\-\s()]{7,20}$/.test(phone))
      nextErrors.phone = "Enter a valid phone number.";
    if (!message) nextErrors.message = "Message is required.";

    if (file && file.size > 0) {
      const max = 5 * 1024 * 1024;
      const allowed = ["application/pdf", "image/jpeg", "image/png"];
      if (file.size > max) nextErrors.attachment = "File must be <= 5MB.";
      if (!allowed.includes(file.type))
        nextErrors.attachment = "Allowed types: PDF, JPG, PNG.";
    }

    setErrors(nextErrors);
    if (focusErrors && Object.keys(nextErrors).length) focusFirstError(form, nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  function handleFieldValidate() {
    if (formRef.current) validate(formRef.current);
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (pending) return;
    const form = e.currentTarget;
    setOk(false);
    setSubmitError("");
    if (!validate(form, true)) return;
    setPending(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        body: new FormData(form),
      });

      const data = await res.json().catch(() => null);
      if (!res.ok || data?.ok !== true) {
        if (data?.errors) {
          setErrors(data.errors);
          focusFirstError(form, data.errors);
        }
        throw new Error("Message was not accepted");
      }

      setOk(true);
      form.reset();
      setErrors({});
    } catch {
      setSubmitError("Sorry, we could not send your message. Please try WhatsApp instead.");
    } finally {
      setPending(false);
    }
  }

  return (
    <form
      ref={formRef}
      className="space-y-5"
      method="post"
      action="/api/contact"
      encType="multipart/form-data"
      noValidate
      aria-busy={pending}
      onSubmit={onSubmit}
    >
      <div>
        <label className="block text-sm font-medium mb-1" htmlFor="name">
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          autoComplete="name"
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? "name-error" : undefined}
          placeholder="Your name"
          className="w-full rounded-md border px-3 py-2 outline-none focus:ring-2 focus:ring-black"
          required
          onBlur={handleFieldValidate}
          onChange={handleFieldValidate}
        />
        {errors.name && <p id="name-error" className="text-sm text-red-700 mt-1">{errors.name}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium mb-1" htmlFor="phone">
          Contact Number
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          aria-invalid={!!errors.phone}
          aria-describedby={errors.phone ? "phone-error" : undefined}
          placeholder="Your contact number"
          className="w-full rounded-md border px-3 py-2 outline-none focus:ring-2 focus:ring-black"
          required
          onBlur={handleFieldValidate}
          onChange={handleFieldValidate}
        />
        {errors.phone && <p id="phone-error" className="text-sm text-red-700 mt-1">{errors.phone}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium mb-1" htmlFor="attachment">
          Add Attachment (optional)
        </label>
        <input
          id="attachment"
          name="attachment"
          type="file"
          accept=".pdf,.jpg,.jpeg,.png"
          aria-invalid={!!errors.attachment}
          aria-describedby={`attachment-help${errors.attachment ? " attachment-error" : ""}`}
          className="w-full rounded-md border px-3 py-2 file:mr-3 file:py-2 file:px-3 file:border-0 file:bg-[#9A0111] file:text-white file:rounded-md"
          onChange={handleFieldValidate}
        />
        {errors.attachment && (
          <p id="attachment-error" className="text-sm text-red-700 mt-1">{errors.attachment}</p>
        )}
        <p id="attachment-help" className="text-xs text-slate-500 mt-1">Max 5MB. PDF, JPG, PNG.</p>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1" htmlFor="message">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? "message-error" : undefined}
          placeholder="Tell us what you need..."
          className="w-full rounded-md border px-3 py-2 outline-none focus:ring-2 focus:ring-black"
          required
          onBlur={handleFieldValidate}
          onChange={handleFieldValidate}
        />
        {errors.message && (
          <p id="message-error" className="text-sm text-red-700 mt-1">{errors.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={pending}
        className="inline-flex items-center justify-center rounded-md bg-[#9A0111] text-white px-5 py-2.5 disabled:opacity-60"
      >
        {pending ? "Sending..." : "Send Message"}
      </button>

      <div role="status" aria-live="polite" aria-atomic="true">
        {pending && <p className="text-sm text-slate-600">Sending your message...</p>}
        {ok && <p className="text-sm text-green-800">Thanks! Your message has been accepted for sending. Our team will follow up.</p>}
      </div>
      <div role="alert" aria-atomic="true">
        {submitError && (
          <p className="text-sm text-red-700">
            {submitError}{" "}
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="font-semibold underline">
              Contact us on WhatsApp
            </a>
          </p>
        )}
      </div>
      <noscript>
        <p className="text-sm text-slate-700">JavaScript is needed for form feedback. You can <a href={whatsappUrl} className="underline">contact us on WhatsApp</a> instead.</p>
      </noscript>
    </form>
  );
}
