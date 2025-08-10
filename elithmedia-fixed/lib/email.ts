'use server'

import { Resend } from 'resend'
import sg from '@sendgrid/mail'
import nodemailer from 'nodemailer'

type MailInput = { to: string | string[], subject: string, html: string, from?: string }

export async function sendMail({to, subject, html, from}: MailInput) {
  const fallbackFrom = process.env.EMAIL_FROM || 'Elith Media <contact@elithmedia.com>'
  const finalFrom = from || fallbackFrom

  if (process.env.RESEND_API_KEY) {
    const resend = new Resend(process.env.RESEND_API_KEY)
    const res = await resend.emails.send({ from: finalFrom, to, subject, html })
    return res
  }

  if (process.env.SENDGRID_API_KEY) {
    sg.setApiKey(process.env.SENDGRID_API_KEY)
    const [res] = await sg.send({ from: finalFrom, to, subject, html })
    return { id: res.headers['x-message-id'] }
  }

  if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
    const transport = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 587),
      secure: false,
      auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
    })
    const info = await transport.sendMail({ from: finalFrom, to, subject, html })
    return { id: info.messageId }
  }

  console.warn('No email provider configured. Skipping send.')
  return { skipped: true }
}
