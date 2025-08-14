import { NextResponse } from "next/server"
import { contactSchema } from "@/lib/validations"
import { makeTransport } from "@/lib/mailer"

export async function POST(request: Request) {
  try {
    const json = await request.json()
    const parsed = contactSchema.safeParse(json)
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.issues[0]?.message || "Bad Request" }, { status: 400 })
    }
    const { name, email, message } = parsed.data
    const to = process.env.CONTACT_TO
    const from = process.env.CONTACT_FROM || process.env.SMTP_USER
    if (!to || !from) {
      console.warn("[contact] Missing CONTACT_TO/FROM -> logging only")
      console.log({ name, email, message })
      return NextResponse.json({ ok: true, dev: true })
    }
    const transport = makeTransport()
    await transport.verify()
    await transport.sendMail({
      from,
      to,
      subject: `Neue Kontaktanfrage von ${name}`,
      replyTo: email,
      text: message,
      html: `<p><strong>Name:</strong> ${name}</p><p><strong>E-Mail:</strong> ${email}</p><p>${message.replace(/\n/g, "<br/>")}</p>`,
    })
    return NextResponse.json({ ok: true })
  } catch (err: any) {
    console.error("[contact] error:", err)
    return NextResponse.json({ ok: false, error: err?.message || "Server error", code: err?.code, command: err?.command }, { status: 500 })
  }
}
