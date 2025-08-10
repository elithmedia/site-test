'use server'
import { LeadSchema } from '@/lib/validators'
import { getServerSupabase } from '@/lib/supabase'
import { getRecaptchaToken } from '@/lib/recaptcha' // dacă ai utilul

export async function submitLead(form: unknown) {
  const parsed = LeadSchema.safeParse(form)
  if (!parsed.success) {
    return { ok: false, error: 'validation', issues: parsed.error.flatten() }
  }
  const v = parsed.data

  // opțional: verifică reCAPTCHA v3
  // const passed = await verifyRecaptcha(v.token)
  // if (!passed) return { ok:false, error:'recaptcha' }

  const supabase = getServerSupabase()

  const { error } = await supabase
    .from('leads')
    .insert({
      full_name: v.full_name,
      email: v.email,
      phone: v.phone ?? null,
      company: v.company ?? null,
      message: v.message,
      consent_marketing: !!v.consent_marketing,
      // câmpurile scoase: punem valori „cuminți”
      services_needed: [],      // sau null, dacă coloana permite
      budget_range: null,       // dacă e nullable
      source: 'website',
    })

  if (error) return { ok:false, error: 'db' }

  // trimite emailuri (auto-reply + intern) ca înainte
  return { ok:true }
}