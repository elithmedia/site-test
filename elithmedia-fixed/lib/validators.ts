import { z } from 'zod'

export const LeadSchema = z.object({
  full_name: z.string().min(2, 'Numele e prea scurt'),
  email: z.string().email('Email invalid'),
  phone: z.string().min(6, 'Telefon invalid'),
  company: z.string().optional().nullable(),
  message: z.string().min(10, 'Te rugam sa detaliezi'),
  services_needed: z.array(z.string()).min(1, 'Selecteaza minim un serviciu'),
  budget_range: z.string(),
  consent_marketing: z.boolean().optional().default(false),
  token: z.string().optional(), // recaptcha token
})
export type LeadInput = z.infer<typeof LeadSchema>
