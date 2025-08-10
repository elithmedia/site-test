'use client'

export function fireEvent(name: string, params: Record<string, any> = {}) {
  if (typeof window === 'undefined') return
  if (!(window as any).gtag) return
  ;(window as any).gtag('event', name, params)
}
