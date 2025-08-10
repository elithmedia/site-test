export type Locale = 'ro' | 'en'

export const dict: Record<Locale, any> = {
  ro: {
    nav: { services: 'Servicii', portfolio: 'Portofoliu', about: 'Despre noi', contact: 'Contact' },
    hero: {
      title: 'Paid media + content care aduc leaduri reale',
      sub: 'Construim reclame si continut care convertesc. Noi gandim strategia, cream executia si optimizam pe rezultate.',
      cta1: 'Cere oferta',
      cta2: 'Vezi portofoliu'
    },
    form: {
      full_name: 'Nume complet',
      email: 'Email',
      phone: 'Telefon',
      company: 'Companie (optional)',
      message: 'Mesaj',
      services_needed: 'Servicii dorite',
      budget_range: 'Buget estimativ',
      submit: 'Trimite cererea',
      success: 'Multumim! Revenim in cel mai scurt timp.',
      error: 'A aparut o eroare. Incearca din nou.'
    }
  },
  en: {
    nav: { services: 'Services', portfolio: 'Portfolio', about: 'About', contact: 'Contact' },
    hero: {
      title: 'Paid media + content that drive qualified leads',
      sub: 'We strategize, create and optimize. Real revenue, not vanity metrics.',
      cta1: 'Request proposal',
      cta2: 'See portfolio'
    },
    form: {
      full_name: 'Full name',
      email: 'Email',
      phone: 'Phone',
      company: 'Company (optional)',
      message: 'Message',
      services_needed: 'Services needed',
      budget_range: 'Budget range',
      submit: 'Submit',
      success: 'Thanks! We will get back to you ASAP.',
      error: 'Something went wrong. Please try again.'
    }
  }
}

export function t(locale: Locale, path: string): string {
  const parts = path.split('.')
  let obj: any = dict[locale] || dict.ro
  for (const p of parts) obj = obj?.[p]
  return obj ?? path
}
