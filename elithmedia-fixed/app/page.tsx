'use client'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import CookieBanner from '@/components/CookieBanner'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { LeadSchema, type LeadInput } from '@/lib/validators'
import { submitLead } from './actions/lead'
import { fireEvent } from '@/lib/analytics'

const services = [
  { key: 'tiktok_ig', title: 'TikTok/Instagram content', bullets: ['Script, filmare, editare', 'Hook-uri si CTA', 'Plan lunar'], price: 'de la 400€' },
  { key: 'meta_ads', title: 'Meta Ads', bullets: ['Campanii lead gen', 'Retargeting', 'A/B testing'], price: 'de la 300€' },
  { key: 'google_ads', title: 'Google Ads', bullets: ['Search + Performance Max', 'Tracking conversii', 'Optimizare'], price: 'de la 300€' },
  { key: 'shorts', title: 'YouTube Shorts', bullets: ['Pachete 8-20 episoade', 'Titluri + thumbnails', 'Programare'], price: 'de la 350€' },
  { key: 'ugc', title: 'UGC', bullets: ['Creatori relevanti', 'Brief + livrabile', 'Drepturi de folosinta'], price: 'de la 250€' },
  { key: 'editing', title: 'Editare foto/video', bullets: ['Color, sunet, subtitrare', 'LUT-uri custom', 'Export optimizat'], price: 'de la 200€' },
  { key: 'strategy', title: 'Strategie & Raportare', bullets: ['Funnel si ICP', 'KPI reali', 'Raport lunar'], price: 'de la 300€' },
]

export default function Home() {
  const [status, setStatus] = useState<'idle'|'loading'|'success'|'error'>('idle')
  const [platformFilter, setPlatformFilter] = useState<'all'|'instagram'|'tiktok'>('all')
  const { register, handleSubmit, reset, formState: { errors } } = useForm<LeadInput>({
    resolver: zodResolver(LeadSchema),
    defaultValues: {
      services_needed: [], budget_range: '500-1000€'
    }
  })

  async function onSubmit(values: LeadInput) {
    setStatus('loading')
    try {
      // @ts-ignore obtain IP best-effort on server
      const res = await submitLead(values)
      if (res.ok) {
        setStatus('success')
        fireEvent('lead_submit', { method: 'form' })
        reset()
      } else {
        console.error(res.error)
        setStatus('error')
      }
    } catch (e) {
      console.error(e)
      setStatus('error')
    }
  }

  return (
    <>
      <Nav />
      <CookieBanner />
      <main id="content">
        {/* Hero */}
        <section className="container py-20 md:py-28">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <motion.h1 initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} transition={{duration:.6}} className="text-4xl md:text-6xl font-bold leading-tight">
                Paid media + content care aduc leaduri reale
              </motion.h1>
              <p className="mt-4 text-lg opacity-80">Strategie clara. Creatie curata. Optimizare pe rezultate. Nu promitem like-uri, ci cereri.</p>
              <div className="mt-6 flex gap-3">
                <a href="#contact" className="px-5 py-3 rounded-lg bg-black text-white dark:bg-white dark:text-black">Cere oferta</a>
                <a href="#portfolio" className="px-5 py-3 rounded-lg border">Vezi portofoliu</a>
              </div>
              <div className="mt-6 opacity-70 text-sm">Incredere: [badge-uri parteneri & certificari]</div>
            </div>
            <motion.div initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} transition={{duration:.6, delay:.1}} className="aspect-video rounded-2xl bg-gradient-to-br from-zinc-100 to-zinc-200 dark:from-zinc-800 dark:to-zinc-700 shadow-inner flex items-center justify-center">
              <span className="opacity-70">Preview portofoliu</span>
            </motion.div>
          </div>
        </section>

        {/* Services */}
        <section id="services" className="container py-16">
          <h2 className="text-2xl md:text-3xl font-semibold mb-6">Servicii</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {services.map(s=>(
              <div key={s.key} className="rounded-2xl border p-6 hover:shadow-md transition">
                <h3 className="font-semibold">{s.title}</h3>
                <ul className="mt-2 space-y-1 text-sm opacity-80">{s.bullets.map(b=><li key={b}>• {b}</li>)}</ul>
                <div className="mt-4 text-sm font-medium">{s.price}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Portfolio (static seed UI placeholder; wired to Supabase in admin) */}
        <section id="portfolio" className="container py-16">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl md:text-3xl font-semibold">Portofoliu</h2>
            <select className="border rounded p-2" value={platformFilter} onChange={(e)=>setPlatformFilter(e.target.value as any)}>
              <option value="all">Toate platformele</option>
              <option value="instagram">Instagram</option>
              <option value="tiktok">TikTok</option>
            </select>
          </div>
          <div className="overflow-x-auto flex gap-4 pb-4">
            {[1,2,3].map(i=>(
              <div key={i} className="min-w-[220px] border rounded-xl p-3">
                <div className="flex items-center gap-3">
                  <img src="/placeholder-avatar.jpg" alt="" className="w-10 h-10 rounded-full"/>
                  <div>
                    <div className="font-medium">Client {i}</div>
                    <div className="text-xs opacity-70">IG • TikTok</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="grid md:grid-cols-3 gap-4 mt-6">
            {[...Array(6)].map((_,i)=>(
              <div key={i} className="aspect-square rounded-xl bg-zinc-100 dark:bg-zinc-800"/>
            ))}
          </div>
        </section>

        {/* About */}
        <section id="about" className="container py-16">
          <h2 className="text-2xl md:text-3xl font-semibold mb-3">Despre noi</h2>
          <p className="opacity-80 max-w-3xl">Elith Media a pornit din nevoia antreprenorilor de a avea un partener care intelege business-ul si vorbeste pe limba cifrelor. Suntem o echipa mica din Bucuresti, orientata pe performanta, care livreaza campanii clare si continut care vinde.</p>
        </section>

        {/* Contact */}
        <section id="contact" className="container py-16">
          <h2 className="text-2xl md:text-3xl font-semibold mb-4">Contact</h2>
          <form className="grid md:grid-cols-2 gap-4" onSubmit={handleSubmit(onSubmit)}>
            <input className="border rounded p-3" placeholder="Nume complet" {...register('full_name')}/>
            <input className="border rounded p-3" placeholder="Email" {...register('email')}/>
            <input className="border rounded p-3" placeholder="Telefon" {...register('phone')}/>
            <input className="border rounded p-3" placeholder="Companie (optional)" {...register('company')}/>
            <textarea className="border rounded p-3 md:col-span-2" placeholder="Mesaj" rows={4} {...register('message')}/>
            <fieldset className="md:col-span-2">
              <legend className="text-sm mb-2">Servicii dorite</legend>
              <div className="grid md:grid-cols-4 gap-2">
                {['TikTok/IG','Meta Ads','Google Ads','YouTube Shorts','UGC','Editare','Strategie & Raportare'].map(s=>(
                  <label key={s} className="flex items-center gap-2 border rounded p-2">
                    <input type="checkbox" value={s} {...register('services_needed')} />
                    <span>{s}</span>
                  </label>
                ))}
              </div>
            </fieldset>
            <select className="border rounded p-3" {...register('budget_range')}>
              {['<500€','500-1000€','1000-3000€','>3000€'].map(b=><option key={b} value={b}>{b}</option>)}
            </select>
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" {...register('consent_marketing')}/> Accept sa primesc comunicari despre servicii.
            </label>
            <button disabled={status==='loading'} className="px-5 py-3 rounded-lg bg-black text-white dark:bg-white dark:text-black md:col-span-2">
              {status==='loading'?'Se trimite…':'Trimite cererea'}
            </button>
          </form>
          <div className="mt-3 text-sm text-red-600">
            {Object.values(errors).length>0 && 'Verifica campurile marcate.'}
          </div>
          {status==='success' && <div className="mt-3 text-sm text-green-600">Multumim! Revenim in cel mai scurt timp.</div>}
          {status==='error' && <div className="mt-3 text-sm text-red-600">A aparut o eroare. Incearca din nou.</div>}
        </section>
      </main>
      <Footer />
    </>
  )
}
