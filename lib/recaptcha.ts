export const RECAPTCHA_SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY

declare global {
  interface Window {
    grecaptcha?: {
      ready(cb: () => void): void
      execute(siteKey: string, opts: { action: string }): Promise<string>
    }
  }
}

function injectScript(siteKey: string) {
  if (typeof document === 'undefined') return
  if (document.getElementById('recaptcha-v3')) return
  const s = document.createElement('script')
  s.id = 'recaptcha-v3'
  s.async = true
  s.src = `https://www.google.com/recaptcha/api.js?render=${siteKey}`
  document.head.appendChild(s)
}

export async function getRecaptchaToken(action: string) {
  const key = RECAPTCHA_SITE_KEY
  if (!key) return null
  if (typeof window === 'undefined') return null
  injectScript(key)
  await new Promise<void>(resolve => {
    const wait = () =>
      window.grecaptcha?.ready(() => resolve()) ?? setTimeout(wait, 50)
    wait()
  })
  try {
    return await window.grecaptcha!.execute(key, { action })
  } catch {
    return null
  }
}
