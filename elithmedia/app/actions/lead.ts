'use server'

import { LeadSchema, type LeadInput } from '@/lib/validators'
import { getServiceSupabase } from '@/lib/supabase'
import { sendMail } from '@/lib/email'

async function verifyRecaptcha(token?: string) {
  if (!process.env.RECAPTCHA_SECRET_KEY || !token) return { ok: true }
  try {
    const res = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        secret: process.env.RECAPTCHA_SECRET_KEY,
        response: token,
      } as any)
    })
    const data = await res.json()
    return { ok: !!data.success, score: data.score ?? 0 }
  } catch {
    return { ok: false }
  }
}

export async function submitLead(form: LeadInput, ip?: string) {
  const parsed = LeadSchema.safeParse(form)
  if (!parsed.success) {
    return { ok: false, error: parsed.error.flatten().fieldErrors }
  }

  const rlMax = Number(process.env.RATE_LIMIT_MAX_PER_10M || 3)
  const supa = getServiceSupabase()
  const now = new Date()
  const tenMinAgo = new Date(now.getTime() - 10 * 60 * 1000).toISOString()

  // rate-limit by ip or email
  const { data: recent, error: rlErr } = await supa
    .from('leads')
    .select('id, created_at')
    .or(`email.eq.${parsed.data.email}${ip ? ',source.eq.' + ip : ''}`)
    .gte('created_at', tenMinAgo)

  if (recent && recent.length >= rlMax) {
    return { ok: false, error: { form: ['Prea multe cereri. Incearca mai tarziu.'] } }
  }

  const recaptcha = await verifyRecaptcha(parsed.data.token)
  if (!recaptcha.ok) {
    return { ok: false, error: { form: ['Verificarea reCAPTCHA a esuat.'] } }
  }

  const { data: lead, error } = await supa
    .from('leads')
    .insert({
      full_name: parsed.data.full_name,
      email: parsed.data.email,
      phone: parsed.data.phone,
      company: parsed.data.company,
      message: parsed.data.message,
      services_needed: parsed.data.services_needed,
      budget_range: parsed.data.budget_range,
      consent_marketing: parsed.data.consent_marketing,
      source: ip || 'unknown'
    })
    .select('*')
    .single()

  if (error) return { ok: false, error: { form: ['Nu am putut salva cererea.'] } }

  // Log consent minimal
  await supa.from('consents').insert({
    lead_id: lead.id,
    user_hash: null,
    tcf_string: 'local',
    ad_storage: 'denied',
    analytics_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied'
  })

  // Emails
  const htmlAuto = `<div style="font-family:Inter,system-ui">
  <p>Salut, ${lead.full_name},</p>
  <p>Iti multumim pentru mesaj! Echipa Elith Media iti va raspunde in cel mai scurt timp.</p>
  <p>Rezumat cerere:</p>
  <ul>
    <li>Servicii: ${lead.services_needed.join(', ')}</li>
    <li>Buget: ${lead.budget_range}</li>
  </ul>
  <p>Cu drag,<br/>Elith Media</p></div>`

  const htmlInternal = `<div style="font-family:Inter,system-ui">
  <h2>Lead nou</h2>
  <pre>${JSON.stringify(lead, null, 2)}</pre>
  </div>`

  const inbox = process.env.ADMIN_INBOX || 'contact@elithmedia.com'
  await sendMail({ to: lead.email, subject: 'Am primit cererea ta', html: htmlAuto })
  await sendMail({ to: inbox, subject: 'Lead nou - Elith Media', html: htmlInternal })

  return { ok: true, leadId: lead.id }
}
