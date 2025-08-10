'use client'
import { useState, useEffect } from 'react'
import { useConsent, storeConsent, applyConsentToGtag, type ConsentState } from '@/lib/consent'

export default function CookieBanner(){
  const { consent } = useConsent()
  const [open, setOpen] = useState(false)
  const [state, setState] = useState<ConsentState>({
    ad_storage:'denied', analytics_storage:'denied', ad_user_data:'denied', ad_personalization:'denied'
  })

  useEffect(()=>{ if(!consent) setOpen(true) },[consent])
  if (!open) return null

  function acceptAll(){
    const s: ConsentState = { ad_storage:'granted', analytics_storage:'granted', ad_user_data:'granted', ad_personalization:'granted' }
    storeConsent(s); applyConsentToGtag(s,'update'); setOpen(false)
  }
  function save(){
    storeConsent(state); applyConsentToGtag(state,'update'); setOpen(false)
  }

  return (
    <div role="dialog" aria-modal="true" className="fixed inset-0 bg-black/30 flex items-end md:items-center justify-center p-4 z-50">
      <div className="glass w-full md:max-w-2xl p-6">
        <h2 className="text-lg font-semibold">Cookie-uri și confidențialitate</h2>
        <p className="text-sm text-zinc-700 mt-1">Folosim cookie-uri pentru funcționalitate, statistici și publicitate. Poți alege pe categorii.</p>
        <div className="grid sm:grid-cols-2 gap-3 my-4">
          <Toggle label="Analytics" checked={state.analytics_storage==='granted'} onChange={v=>setState(s=>({...s,analytics_storage:v?'granted':'denied'}))} />
          <Toggle label="Ads storage" checked={state.ad_storage==='granted'} onChange={v=>setState(s=>({...s,ad_storage:v?'granted':'denied'}))} />
          <Toggle label="Ad user data" checked={state.ad_user_data==='granted'} onChange={v=>setState(s=>({...s,ad_user_data:v?'granted':'denied'}))} />
          <Toggle label="Ad personalization" checked={state.ad_personalization==='granted'} onChange={v=>setState(s=>({...s,ad_personalization:v?'granted':'denied'}))} />
        </div>
        <div className="flex flex-col sm:flex-row gap-2 justify-end">
          <button className="btn btn-ghost" onClick={()=>setOpen(false)}>Doar necesare</button>
          <button className="btn btn-ghost" onClick={save}>Salvează</button>
          <button className="btn btn-primary cookie-cta" onClick={acceptAll}>Accept toate</button>
        </div>
      </div>
    </div>
  )
}

function Toggle({label, checked, onChange}:{label:string, checked:boolean, onChange:(v:boolean)=>void}){
  return (
    <label className="flex items-center justify-between glass px-3 py-2">
      <span className="text-sm">{label}</span>
      <input type="checkbox" checked={checked} onChange={e=>onChange(e.target.checked)} aria-label={label} />
    </label>
  )
}