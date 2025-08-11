'use client'

import { useEffect, useRef } from 'react'

export default function Hero() {
  return (
    <section id="home" aria-label="Elith Media - Agenție de marketing" className="hero">
      <GalaxyCanvas />
      <div className="hero-overlay" />
      <div className="hero-fade" />

      <div className="container relative z-10">
        <div className="hero-inner">
          <h1 className="hero-title">
            Elith Media
            <span className="block hero-subtitle">
              Agenție de marketing digital în București
            </span>
          </h1>

          <p className="hero-copy">
            Conținut video scurt pentru TikTok, Instagram și YouTube Shorts, campanii Meta & Google Ads,
            <strong> optimizate pe leaduri și vânzări</strong>. Producție, distribuție și raportare clară,
            pentru branduri care vor creștere reală în România.
          </p>

          <div className="hero-cta">
            <a href="#contact" className="btn btn-primary">Cere ofertă</a>
            <a href="#portfolio" className="btn">Vezi portofoliul</a>
          </div>

          <div className="sr-only">
            Marketing performance, paid media, content video, social media România, campanii PPC București.
          </div>
        </div>
      </div>
    </section>
  )
}

/* =========================
   Galaxy canvas (TS-safe)
   ========================= */
function GalaxyCanvas() {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const c = ref.current
    if (!c) return

    const ctx = c.getContext('2d', { alpha: true })
    if (!ctx) return

    let raf = 0
    let width = 0, height = 0
    const dpr = Math.min(window.devicePixelRatio || 1, 2)

    type Star = { x: number; y: number; z: number; r: number; tw: number }
    const STAR_COUNT = 240
    const stars: Star[] = []
    const rnd = (a: number, b: number) => a + Math.random() * (b - a)

    function resize(el: HTMLCanvasElement) {
      const rect = el.getBoundingClientRect()
      width = Math.max(1, Math.floor(rect.width))
      height = Math.max(1, Math.floor(rect.height))
      el.width = Math.floor(width * dpr)
      el.height = Math.floor(height * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    function init() {
      stars.length = 0
      for (let i = 0; i < STAR_COUNT; i++) {
        stars.push({
          x: rnd(-width, width * 2),
          y: rnd(-height, height * 2),
          z: rnd(0.2, 1.6),
          r: rnd(0.3, 1.6),
          tw: rnd(0, Math.PI * 2),
        })
      }
    }

    let t = 0
    function draw() {
      t += 0.016

      // fundal & „space fog”
      ctx.fillStyle = 'rgba(0,0,0,0.35)'
      ctx.fillRect(0, 0, width, height)

      const g1 = ctx.createRadialGradient(
        width * 0.85, height * -0.1, 0,
        width * 0.85, height * -0.1, Math.max(width, height)
      )
      g1.addColorStop(0, 'rgba(50,90,180,0.20)')
      g1.addColorStop(1, 'rgba(0,0,0,0)')
      ctx.fillStyle = g1
      ctx.fillRect(0, 0, width, height)

      // stele & twinkle
      for (let i = 0; i < stars.length; i++) {
        const s = stars[i]
        s.x -= 0.03 * s.z
        if (s.x < -width * 0.2) {
          s.x = width * 1.2
          s.y = rnd(-height * 0.2, height * 1.2)
          s.z = rnd(0.2, 1.6)
        }
        const alpha = 0.65 + 0.35 * Math.sin(t * 2 + s.tw)
        ctx.beginPath()
        ctx.arc(s.x, s.y, s.r * s.z, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(230,240,255,${alpha})`
        ctx.fill()

        // glint ocazional
        if (s.r > 1.2 && Math.random() < 0.02) {
          ctx.fillStyle = `rgba(150,180,255,${alpha * 0.35})`
          ctx.fillRect(s.x - 6 * s.z, s.y, 12 * s.z, 1)
        }
      }

      // nebula tint
      const g2 = ctx.createRadialGradient(
        width * 0.2, height * 0.2, 0,
        width * 0.2, height * 0.2, Math.max(width, height) * 0.8
      )
      g2.addColorStop(0, 'rgba(30,200,220,0.10)')
      g2.addColorStop(1, 'rgba(0,0,0,0)')
      ctx.fillStyle = g2
      ctx.fillRect(0, 0, width, height)

      raf = requestAnimationFrame(draw)
    }

    const onResize = () => { resize(c); init() }
    resize(c); init()

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (!reduce.matches) raf = requestAnimationFrame(draw)
    else { draw(); cancelAnimationFrame(raf) }

    window.addEventListener('resize', onResize)
    return () => {
      window.removeEventListener('resize', onResize)
      cancelAnimationFrame(raf)
    }
  }, [])

  return <canvas ref={ref} className="hero-canvas" />
}
