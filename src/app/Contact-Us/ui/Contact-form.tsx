"use client";

import { useState } from "react";

type Errors = Partial<{
  name: string;
  phone: string;
  message: string;
  attachment: string;
}>;

export default function ContactForm() {
  const [pending, setPending] = useState(false);
  const [ok, setOk] = useState(false);
  const [errors, setErrors] = useState<Errors>({});

  function validate(form: HTMLFormElement) {
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
      if (file.size > max) nextErrors.attachment = "File must be ≤ 5MB.";
      const allowed = ["application/pdf", "image/jpeg", "image/png"];
      if (!allowed.includes(file.type))
        nextErrors.attachment = "Allowed types: PDF, JPG, PNG.";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;

    if (!validate(form)) return;

    setPending(true);
    await new Promise((r) => setTimeout(r, 600));
    setPending(false);
    setOk(true);
    form.reset();
  }

  return (
    <form
      onSubmit={onSubmit}
      className="space-y-5"
      encType="multipart/form-data"
      noValidate
    >
      {ok && (
        <div className="rounded-md border border-green-300 bg-green-50 text-green-800 px-4 py-3">
         Message ready! (We’ll hook up sending next.)
        </div>
      )}

      <div>
        <label className="block text-sm font-medium mb-1" htmlFor="name">
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          placeholder="John Doe"
          className="w-full rounded-md border px-3 py-2 outline-none focus:ring-2 focus:ring-black"
          required
        />
        {errors.name && <p className="text-sm text-red-600 mt-1">{errors.name}</p>}
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
          placeholder="+94 71 234 5678"
          className="w-full rounded-md border px-3 py-2 outline-none focus:ring-2 focus:ring-black"
          required
        />
        {errors.phone && <p className="text-sm text-red-600 mt-1">{errors.phone}</p>}
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
          className="w-full rounded-md border px-3 py-2 file:mr-3 file:py-2 file:px-3 file:border-0 file:bg-[#9A0111] file:text-white file:rounded-md"
        />
        {errors.attachment && (
          <p className="text-sm text-red-600 mt-1">{errors.attachment}</p>
        )}
        <p className="text-xs text-slate-500 mt-1">Max 5MB. PDF, JPG, PNG.</p>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1" htmlFor="message">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          placeholder="Tell us what you need…"
          className="w-full rounded-md border px-3 py-2 outline-none focus:ring-2 focus:ring-black"
          required
        />
        {errors.message && (
          <p className="text-sm text-red-600 mt-1">{errors.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={pending}
        className="inline-flex items-center justify-center rounded-md bg-[#9A0111] text-white px-5 py-2.5 disabled:opacity-60"
      >
        {pending ? "Saving..." : "Send Message"}
      </button>
    </form>
  );
}
