'use client'
import { useEffect, useState } from 'react'

export type ConsentState = {
  ad_storage:'granted'|'denied'
  analytics_storage:'granted'|'denied'
  ad_user_data:'granted'|'denied'
  ad_personalization:'granted'|'denied'
  timestamp?: number
}

const KEY = 'elith_consent_v2'

export function getStoredConsent(): ConsentState | null {
  try { const raw = localStorage.getItem(KEY); return raw ? JSON.parse(raw) : null } catch { return null }
}
export function storeConsent(s: ConsentState) {
  localStorage.setItem(KEY, JSON.stringify({ ...s, timestamp: Date.now() }))
}
export function applyConsentToGtag(s: ConsentState, mode:'default'|'update'='update'){
  if (typeof window === 'undefined') return
  // ensure dataLayer/gtag
  ;(window as any).dataLayer = (window as any).dataLayer || []
  function gtag(){ (window as any).dataLayer.push(arguments as any) }
  ;(window as any).gtag = (window as any).gtag || gtag
  ;(window as any).gtag('consent', mode, {
    ad_storage: s.ad_storage, analytics_storage: s.analytics_storage,
    ad_user_data: s.ad_user_data, ad_personalization: s.ad_personalization
  })
}

declare global { interface Window { __cmp?: any } }

export function useConsent(){
  const [consent, setConsent] = useState<ConsentState | null>(null)
  useEffect(()=>{
    const s = getStoredConsent()
    if (s) { setConsent(s); applyConsentToGtag(s, 'default') }
    else { applyConsentToGtag({ ad_storage:'denied', analytics_storage:'denied', ad_user_data:'denied', ad_personalization:'denied' }, 'default') }
    // minimal CMP-style API
    window.__cmp = (cmd: string, _params: any, cb: Function) => {
      const cur = getStoredConsent()
      if (cmd === 'getConsent') return cb(cur, true)
      if (cmd === 'setConsent') { storeConsent(_params); applyConsentToGtag(_params,'update'); setConsent(_params); return cb(true, true) }
      return cb(null, false)
    }
  },[])
  return { consent, setConsent }
}
