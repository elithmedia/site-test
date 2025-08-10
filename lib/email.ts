'use server'

import { Resend } from 'resend'
import sg from '@sendgrid/mail'

type MailInput = {
  to: string | string[]
  subject: string
  html: string
  from?: string
}

const FROM = process.env.EMAIL_FROM || 'no-reply@example.com'

/**
 * Trimite email prin:
 * 1) Resend (dacă RESEND_API_KEY), altfel
 * 2) SendGrid (dacă SENDGRID_API_KEY), altfel
 * 3) SMTP via Nodemailer (dacă SMTP_HOST...). Nodemailer e importat dinamic ca `any`
 *    ca să NU necesite @types/nodemailer în buildul Vercel.
 */
export async function sendMail({ to, subject, html, from }: MailInput) {
  // 1) Resend
  if (process.env.RESEND_API_KEY) {
    const resend = new Resend(process.env.RESEND_API_KEY)
    const res = await resend.emails.send({
      from: from || FROM,
      to,
      subject,
      html,
    })
    return {
      ok: !res.error,
      provider: 'resend',
      id: (res.data as any)?.id ?? null,
      error: res.error ?? null,
    }
  }

  // 2) SendGrid
  if (process.env.SENDGRID_API_KEY) {
    sg.setApiKey(process.env.SENDGRID_API_KEY)
    const [resp] = await sg.send({
      from: from || FROM,
      to,
      subject,
      html,
      // prevenim mod sandbox accidental
      mailSettings: { sandboxMode: { enable: false } },
    } as any)
    return {
      ok: resp.statusCode < 300,
      provider: 'sendgrid',
      id: (resp.headers as any)['x-message-id'] ?? null,
      error: null,
    }
  }

  // 3) SMTP via Nodemailer (import dinamic + tip any)
  if (process.env.SMTP_HOST) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const nodemailer: any = await import('nodemailer')
    const transport = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 587),
      secure: process.env.SMTP_SECURE === 'true',
      auth: process.env.SMTP_USER
        ? { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
        : undefined,
    })
    const info = await transport.sendMail({
      from: from || FROM,
      to,
      subject,
      html,
    })
    return {
      ok: !!info?.messageId,
      provider: 'smtp',
      id: info?.messageId ?? null,
      error: null,
    }
  }

  console.warn('No email provider configured (RESEND_API_KEY / SENDGRID_API_KEY / SMTP_HOST).')
  return { ok: false, provider: null, id: null, error: 'no-provider' }
}