'use client'

import { useEffect, useMemo, useState } from 'react'
import { clients as seed } from '@/data/portfolio'
import { IconFacebook, IconInstagram, IconTikTok } from '@/components/icons/Social'

export default function Portfolio() {
  const [selectedId, setSelectedId] = useState(seed[0]?.id)
  const selected = useMemo(() => seed.find(c => c.id === selectedId), [selectedId])
  const media = useMemo(() => selected?.projects.flatMap(p => p.media) ?? [], [selected])
  const [idx, setIdx] = useState(0)

  useEffect(() => { setIdx(0) }, [selectedId])

  function prev() { setIdx(i => (i - 1 + media.length) % media.length) }
  function next() { setIdx(i => (i + 1) % media.length) }

  let touchX = 0
  function onTouchStart(e: React.TouchEvent) { touchX = e.touches[0].clientX }
  function onTouchEnd(e: React.TouchEvent) {
    const dx = e.changedTouches[0].clientX - touchX
    if (Math.abs(dx) > 40) dx < 0 ? next() : prev()
  }

  return (
    <div className="w-full max-w-6xl mx-auto">
      {/* strip central cu clienți */}
      <div className="-mx-6 px-6 mt-6">
        <div className="strip-surface scroll-fade overflow-x-auto">
          <div className="flex gap-4 justify-center pr-3 py-3">
            {seed.map(c => {
              const isSel = c.id === selectedId
              return (
                <div key={c.id} className="shrink-0">
                  <button
                    onClick={() => setSelectedId(c.id)}
                    className={`chip-glass w-[168px] flex flex-col items-center px-4 py-4 ${isSel ? 'is-selected ring-2 ring-brand-500' : ''}`}
                    aria-pressed={isSel}
                  >
                    {/* avatar */}
                    <div className="w-14 h-14 rounded-full bg-zinc-200" />
                    {/* nume */}
                    <div className="mt-3 text-sm font-medium text-zinc-900">{c.name}</div>
                    {/* social icons */}
                    <div className="mt-2 flex items-center gap-2">
                      {c.instagram_url && (
                        <a className="social-pill" href={c.instagram_url} target="_blank" rel="noreferrer" aria-label="Instagram">
                          <IconInstagram />
                        </a>
                      )}
                      {c.tiktok_url && (
                        <a className="social-pill" href={c.tiktok_url} target="_blank" rel="noreferrer" aria-label="TikTok">
                          <IconTikTok />
                        </a>
                      )}
                      {c.facebook_url && (
                        <a className="social-pill" href={c.facebook_url} target="_blank" rel="noreferrer" aria-label="Facebook">
                          <IconFacebook />
                        </a>
                      )}
                    </div>
                  </button>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* carusel central pentru media clientului */}
      <div className="mt-10">
        <div
          className="glass relative w-full aspect-video overflow-hidden"
          tabIndex={0}
          onKeyDown={(e) => { if (e.key === 'ArrowLeft') prev(); if (e.key === 'ArrowRight') next() }}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          {media.length === 0 && (
            <div className="grid place-items-center h-full text-zinc-500 text-sm">
              Nimic de afișat pentru acest client (încă).
            </div>
          )}

          {media.length > 0 && (
            <>
              <Slide media={media[idx] as any} />
              <button
                aria-label="Anterior"
                onClick={prev}
                className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-white/70 backdrop-blur border border-white/80 px-3 py-2 hover:translate-y-[-50%] hover:scale-[1.02] transition"
              >
                ‹
              </button>
              <button
                aria-label="Următor"
                onClick={next}
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-white/70 backdrop-blur border border-white/80 px-3 py-2 hover:translate-y-[-50%] hover:scale-[1.02] transition"
              >
                ›
              </button>
            </>
          )}
        </div>

        {media.length > 1 && (
          <div className="mt-3 flex justify-center gap-2">
            {media.map((_, i) => (
              <button
                key={i}
                aria-label={`Slide ${i + 1}`}
                onClick={() => setIdx(i)}
                className={`h-2.5 w-2.5 rounded-full ${i === idx ? 'bg-zinc-800' : 'bg-zinc-300'}`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

function Slide({ media }: { media: any }) {
  if (!media) return null
  if (media.type === 'image') {
    return (
      <div className="w-full h-full">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={media.url} alt={media.caption || 'media'} className="w-full h-full object-cover" />
      </div>
    )
  }
  if (media.type === 'embed') {
    return (
      <iframe
        src={media.url}
        className="w-full h-full"
        allow="autoplay; clipboard-write; encrypted-media; picture-in-picture"
      />
    )
  }
  return (
    <video src={media.url} poster={media.poster} controls className="w-full h-full object-cover" />
  )
}