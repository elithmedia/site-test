'use client'

import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import CookieBanner from '@/components/CookieBanner'
import Portfolio from '@/components/Portfolio'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { LeadSchema, type LeadInput } from '@/lib/validators'
import { submitLead } from './actions/lead'
import { getRecaptchaToken } from '@/lib/recaptcha'
import { useState } from 'react'

const services = [
  { key:'tiktok_ig', title:'TikTok/Instagram content', bullets:['Script, filmare, editare','Hook-uri și CTA','Plan lunar'], price:'de la 400€' },
  { key:'meta_ads', title:'Meta Ads', bullets:['Campanii lead gen','Retargeting','A/B testing'], price:'de la 300€' },
  { key:'google_ads', title:'Google Ads', bullets:['Search + Performance Max','Tracking conversii','Optimizare'], price:'de la 300€' },
  { key:'shorts', title:'YouTube Shorts', bullets:['Pachete 8-20 episoade','Titluri + thumbnails','Programare'], price:'de la 350€' },
  { key:'ugc', title:'UGC', bullets:['Creatori relevanți','Brief + livrabile','Drepturi de folosinta'], price:'de la 250€' },
  { key:'editing', title:'Editare foto/video', bullets:['Color, sunet, subtitrare','LUT-uri custom','Export optimizat'], price:'de la 200€' },
  { key:'strategy', title:'Strategie & Raportare', bullets:['Funnel și ICP','KPI reali','Raport lunar'], price:'de la 300€' },
]

export default function Page() {
  const { register, handleSubmit, reset, formState:{ errors, isSubmitting } } =
    useForm<LeadInput>({ resolver: zodResolver(LeadSchema),})

  const [submitted, setSubmitted] = useState(false)

  async function onSubmit(v: LeadInput) {
    try {
      const token = await getRecaptchaToken('contact_submit')
      if (token) { (v as any).token = token }
      const r = await submitLead(v)
      if (r.ok) { setSubmitted(true); reset() }
    } catch (e) { console.error(e) }
  }

  return (
    <>
      <Nav />
      <CookieBanner />

      <main id="content">
        {/* HERO minimal */}
        <section className="section">
          <div className="container">
            <h1 className="text-5xl md:text-7xl font-extrabold leading-tight tracking-tight text-zinc-900">
              Paid media + content care <span className="text-brand-600">aduc leaduri</span>
            </h1>
            <p className="mt-4 text-lg text-zinc-600 max-w-3xl">
              Campanii și conținut scurt care generează cereri reale. Strategie clară, execuție curată, optimizare pe KPI.
            </p>
            <div className="mt-8 flex gap-3">
              <a href="#contact" className="btn btn-primary">Cere ofertă</a>
              <a href="#portfolio" className="btn btn-ghost">Vezi portofoliu</a>
            </div>
          </div>
        </section>

        <hr className="sep" />

        {/* DESPRE NOI */}
        <section id="about" className="section">
          <div className="container grid md:grid-cols-12 gap-10 items-start">
            <div className="md:col-span-7">
              <h2 className="text-3xl md:text-4xl font-semibold">Despre noi</h2>
              <p className="mt-3 text-zinc-600 max-w-3xl">
                Suntem o agenție din București. Ne concentrăm pe rezultate măsurabile: leaduri, cost pe conversie, revenue.
                Lucrăm cu branduri locale care vor creștere reală.
              </p>
            </div>
            <div className="md:col-span-5">
              <div className="glass p-6">
                <p className="text-sm text-zinc-700">
                  Focus: Meta Ads, Google Ads, conținut scurt pe TikTok/IG și YouTube Shorts, plus raportare care arată clar ROI-ul.
                </p>
              </div>
            </div>
          </div>
        </section>

        <hr className="sep" />

        {/* PORTOFOLIU (interactiv, media pe client) */}
        <section id="portfolio" className="section">
          <div className="container">
            <h2 className="text-3xl md:text-4xl font-semibold">Portofoliu</h2>
            <Portfolio />
          </div>
        </section>

        <hr className="sep" />

        {/* CONTACT */}
        <section id="contact" className="section">
          <div className="container grid md:grid-cols-12 gap-10">
            <div className="md:col-span-5">
              <h2 className="text-3xl md:text-4xl font-semibold">Contact</h2>
              <p className="text-zinc-600 mt-2">Răspundem rapid. Spune-ne ce ai nevoie.</p>

              {/* căsuțe info pe stânga */}
              <div className="mt-6 grid gap-3">
                <div className="glass p-4">
                  <div className="text-xs text-zinc-500">Adresă</div>
                  <div className="font-medium">București, Sector 6, Str. Vlădeasa nr. 7, Bl. C34, Sc. 1, Et. 5, Ap. 35</div>
                </div>
                <div className="glass p-4">
                  <div className="text-xs text-zinc-500">Telefon</div>
                  <a href="tel:+40XXXXXXXXX" className="font-medium underline">+40 XXX XXX XXX</a>
                </div>
                <div className="glass p-4">
                  <div className="text-xs text-zinc-500">Email</div>
                  <a href="mailto:contact@elithmedia.com" className="font-medium underline">contact@elithmedia.com</a>
                </div>
              </div>
            </div>

            <div className="md:col-span-7">
              <div className="glass p-6">
                <form className="grid md:grid-cols-2 gap-4" onSubmit={handleSubmit(onSubmit)}>
                  <label className="sr-only" htmlFor="full_name">Nume complet</label>
                  <input id="full_name" className="input-glass w-full" placeholder="Nume complet" {...register('full_name')} />

                  <label className="sr-only" htmlFor="email">Email</label>
                  <input id="email" className="input-glass w-full" placeholder="Email" {...register('email')} />

                  <label className="sr-only" htmlFor="phone">Telefon</label>
                  <input id="phone" className="input-glass w-full" placeholder="Telefon" {...register('phone')} />

                  <label className="sr-only" htmlFor="company">Companie (optional)</label>
                  <input id="company" className="input-glass w-full" placeholder="Companie (optional)" {...register('company')} />

                  <label className="sr-only md:col-span-2" htmlFor="message">Mesaj</label>
                  <textarea id="message" className="input-glass w-full md:col-span-2" placeholder="Mesaj" rows={4} {...register('message')} />

                  <label className="flex items-center gap-2 text-sm text-zinc-700">
                    <input type="checkbox" {...register('consent_marketing')} /> Accept să primesc comunicări.
                  </label>

                  <input type="hidden" name="token" />

                  <button disabled={isSubmitting} className="btn btn-primary md:col-span-2">
                    {isSubmitting ? 'Se trimite…' : 'Trimite cererea'}
                  </button>

                  <p className="mt-3 text-xs text-zinc-500 md:col-span-2">
                    Site-ul este protejat de reCAPTCHA și se aplică
                    <a className="underline ml-1" href="https://policies.google.com/privacy" target="_blank" rel="noreferrer">Privacy Policy</a>
                    și
                    <a className="underline ml-1" href="https://policies.google.com/terms" target="_blank" rel="noreferrer">Terms of Service</a>.
                  </p>
                </form>

                {Object.values(errors).length > 0 && <div className="mt-2 text-sm text-rose-600">Verifică câmpurile.</div>}
                {submitted && <div className="mt-2 text-sm text-emerald-600">Mulțumim! Revenim în curând.</div>}
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}