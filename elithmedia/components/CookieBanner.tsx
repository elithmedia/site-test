'use client'

import { useConsent, storeConsent, applyConsentToGtag, type ConsentState } from '@/lib/consent'
import { useEffect, useState } from 'react'

export default function CookieBanner() {
  const { consent } = useConsent()
  const [open, setOpen] = useState(false)
  const [state, setState] = useState<ConsentState>({
    ad_storage: 'denied',
    analytics_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
  })

  useEffect(() => {
    if (!consent) setOpen(true)
  }, [consent])

  if (!open) return null

  function acceptAll() {
    const s: ConsentState = {
      ad_storage: 'granted',
      analytics_storage: 'granted',
      ad_user_data: 'granted',
      ad_personalization: 'granted'
    }
    storeConsent(s)
    applyConsentToGtag(s, 'update')
    setOpen(false)
  }
  function save() {
    storeConsent(state)
    applyConsentToGtag(state, 'update')
    setOpen(false)
  }

  return (
    <div role="dialog" aria-modal="true" className="fixed inset-0 bg-black/40 flex items-end md:items-center justify-center p-4">
      <div className="w-full md:max-w-2xl bg-white dark:bg-zinc-900 rounded-2xl shadow p-6">
        <h2 className="text-lg font-semibold mb-2">Cookie-uri si confidentialitate</h2>
        <p className="text-sm opacity-80 mb-4">
          Folosim cookie-uri pentru functionalitate, statistici si publicitate. Poti alege pe categorii. Poti schimba oricand din „Setari cookie” in subsol.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <Toggle label="Analytics" checked={state.analytics_storage==='granted'} onChange={(v)=>setState(s=>({...s, analytics_storage: v?'granted':'denied'}))}/>
          <Toggle label="Ads storage" checked={state.ad_storage==='granted'} onChange={(v)=>setState(s=>({...s, ad_storage: v?'granted':'denied'}))}/>
          <Toggle label="Ad user data" checked={state.ad_user_data==='granted'} onChange={(v)=>setState(s=>({...s, ad_user_data: v?'granted':'denied'}))}/>
          <Toggle label="Ad personalization" checked={state.ad_personalization==='granted'} onChange={(v)=>setState(s=>({...s, ad_personalization: v?'granted':'denied'}))}/>
        </div>
        <div className="flex flex-col md:flex-row gap-2 justify-end">
          <button className="px-4 py-2 rounded border" onClick={()=>setOpen(false)}>Doar necesare</button>
          <button className="px-4 py-2 rounded border" onClick={save}>Salveaza</button>
          <button className="px-4 py-2 rounded bg-black text-white dark:bg-white dark:text-black" onClick={acceptAll}>Accept toate</button>
        </div>
      </div>
    </div>
  )
}

function Toggle({label, checked, onChange}:{label:string, checked:boolean, onChange:(v:boolean)=>void}){
  return (
    <label className="flex items-center justify-between rounded border p-3">
      <span>{label}</span>
      <input type="checkbox" checked={checked} onChange={e=>onChange(e.target.checked)} aria-label={label}/>
    </label>
  )
}
