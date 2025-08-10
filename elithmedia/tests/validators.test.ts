import { describe, it, expect } from 'vitest'
import { LeadSchema } from '../lib/validators'

describe('LeadSchema', () => {
  it('validates a correct payload', () => {
    const data = {
      full_name: 'Dan Test',
      email: 'dan@example.com',
      phone: '0712345678',
      company: 'Elith',
      message: 'Vreau Meta Ads si video.',
      services_needed: ['Meta Ads'],
      budget_range: '500-1000€',
      consent_marketing: true
    }
    const res = LeadSchema.safeParse(data)
    expect(res.success).toBe(true)
  })
  it('rejects invalid email', () => {
    const res = LeadSchema.safeParse({full_name:'x',email:'bad',phone:'1',message:'short',services_needed:[],budget_range:'-' })
    expect(res.success).toBe(false)
  })
})
