'use client'

import { useEffect, useState } from 'react'

export type ConsentState = {
  ad_storage: 'granted' | 'denied'
  analytics_storage: 'granted' | 'denied'
  ad_user_data: 'granted' | 'denied'
  ad_personalization: 'granted' | 'denied'
  timestamp?: number
}

const KEY = 'elith_consent_v2'

export function getStoredConsent(): ConsentState | null {
  try {
    const raw = localStorage.getItem(KEY)
    return raw ? JSON.parse(raw) : null
  } catch { return null }
}

export function storeConsent(state: ConsentState) {
  localStorage.setItem(KEY, JSON.stringify({ ...state, timestamp: Date.now() }))
}

declare global {
  interface Window {
    dataLayer: any[]
    gtag: any
    __cmp?: (...args: any[]) => void
    __tcfapi?: (...args: any[]) => void
  }
}

export function applyConsentToGtag(state: ConsentState, mode: 'default' | 'update' = 'update') {
  if (typeof window === 'undefined') return
  window.dataLayer = window.dataLayer || []
  function gtag(){window.dataLayer.push(arguments as any)}
  // @ts-ignore
  window.gtag = window.gtag || gtag
  window.gtag('consent', mode, {
    ad_storage: state.ad_storage,
    analytics_storage: state.analytics_storage,
    ad_user_data: state.ad_user_data,
    ad_personalization: state.ad_personalization,
  })
}

export function useConsent() {
  const [consent, setConsent] = useState<ConsentState | null>(null)
  useEffect(() => {
    const s = getStoredConsent()
    if (s) {
      setConsent(s)
      applyConsentToGtag(s, 'default')
    } else {
      const def: ConsentState = {
        ad_storage: 'denied',
        analytics_storage: 'denied',
        ad_user_data: 'denied',
        ad_personalization: 'denied',
      }
      applyConsentToGtag(def, 'default')
    }

    // Minimal __cmp / __tcfapi shim (non-certified). Exposes read/write.
    window.__cmp = function(command: string, param: any, cb: Function) {
      const current = getStoredConsent() || {
        ad_storage: 'denied',
        analytics_storage: 'denied',
        ad_user_data: 'denied',
        ad_personalization: 'denied',
      }
      if (command === 'getConsent') return cb(current, true)
      if (command === 'setConsent') {
        storeConsent(param)
        applyConsentToGtag(param, 'update')
        setConsent(param)
        return cb(true, true)
      }
      return cb(null, false)
    }

    window.__tcfapi = function(command: string, version: number, cb: Function) {
      if (command === 'getTCData') {
        const current = getStoredConsent()
        // We don't generate a real TCF string here. For production certification,
        // integrate a certified CMP. We return a minimal structure.
        cb({
          tcfPolicyVersion: 4,
          gdprApplies: true,
          eventStatus: 'tcloaded',
          cmpStatus: 'loaded',
          tcString: 'COwAAAAAA', // placeholder
          purpose: {
            consents: {
              1: current?.analytics_storage === 'granted', // storage and access
              3: current?.ad_personalization === 'granted', // personalization
              4: current?.ad_user_data === 'granted', // selection, delivery
              7: current?.ad_storage === 'granted' // measurement/ads
            }
          }
        }, true)
      }
    }
  }, [])

  return { consent, setConsent }
}
