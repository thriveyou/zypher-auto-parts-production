import { NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const apiKey = process.env.RESEND_API_KEY;
    const fromEmail = process.env.FROM_EMAIL;
    const toEmail = process.env.TO_EMAIL;

    if (!apiKey || !fromEmail || !toEmail) {
      console.error("Missing contact email configuration.");
      return NextResponse.json(
        { ok: false, error: "Contact service is not configured." },
        { status: 500 },
      );
    }

    const formData = await req.formData();

    const name = (formData.get("name") as string)?.trim();
    const phone = (formData.get("phone") as string)?.trim();
    const message = (formData.get("message") as string)?.trim();
    const file = formData.get("attachment") as File | null;

    const errors: Record<string, string> = {};
    if (!name) errors.name = "Name is required.";
    if (!phone) errors.phone = "Contact number is required.";
    else if (!/^[0-9+\-\s()]{7,20}$/.test(phone))
      errors.phone = "Enter a valid phone number.";
    if (!message) errors.message = "Message is required.";

    if (file && file.size > 0) {
      const max = 5 * 1024 * 1024;
      const allowed = ["application/pdf", "image/jpeg", "image/png"];
      if (file.size > max) errors.attachment = "File must be <= 5MB.";
      if (!allowed.includes(file.type))
        errors.attachment = "Allowed types: PDF, JPG, PNG.";
    }

    if (Object.keys(errors).length) {
      return NextResponse.json({ ok: false, errors }, { status: 400 });
    }

    const html = `
      <div style="font-family:system-ui,Segoe UI,Arial,sans-serif;font-size:14px;line-height:1.6">
        <h2>Zypher Imports - New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Phone:</strong> ${escapeHtml(phone)}</p>
        <p><strong>Message:</strong><br/>${escapeHtml(message).replace(/\n/g, "<br/>")}</p>
      </div>
    `;

    const attachments =
      file && file.size > 0
        ? [
            {
              filename: file.name,
              content: Buffer.from(await file.arrayBuffer()),
            },
          ]
        : undefined;

    const resend = new Resend(apiKey);

    const { data, error } = await resend.emails.send({
      from: `Zypher Contact <${fromEmail}>`,
      to: toEmail,
      subject: `New message from ${name}`,
      html,
      text: `Name: ${name}\nPhone: ${phone}\n\nMessage:\n${message}`,
      attachments,
    });

    if (error || !data?.id) {
      console.error("Contact email provider did not accept the message.");
      return NextResponse.json(
        { ok: false, error: "We could not send your message. Please try again or contact us on WhatsApp." },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch {
    console.error("Contact message submission failed.");
    return NextResponse.json(
      { ok: false, error: "We could not send your message. Please try again or contact us on WhatsApp." },
      { status: 500 },
    );
  }
}

function escapeHtml(input: string) {
  return input
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
