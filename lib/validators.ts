import { z } from 'zod'

export const LeadSchema = z.object({
  full_name: z.string().min(2, 'Numele e prea scurt'),
  email: z.string().email('Email invalid'),
  phone: z.string().min(5, 'Telefon invalid').optional(),
  company: z.string().optional(),
  message: z.string().min(5, 'Mesaj prea scurt'),
  consent_marketing: z.boolean().optional(),
  token: z.string().optional(), // reCAPTCHA v3
})

export type LeadInput = z.infer<typeof LeadSchema>