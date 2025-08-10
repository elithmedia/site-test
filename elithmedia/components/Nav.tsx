'use client'
import Link from 'next/link'
import { useTheme } from 'next-themes'
import { useState } from 'react'

export default function Nav() {
  const { theme, setTheme } = useTheme()
  const [open, setOpen] = useState(false)
  return (
    <header className="sticky top-0 z-40 bg-white/80 dark:bg-black/50 backdrop-blur border-b">
      <div className="container flex items-center justify-between h-14">
        <a href="/" className="font-bold tracking-tight">Elith Media</a>
        <nav className="hidden md:flex gap-6 text-sm">
          <a href="#services" className="hover:underline">Servicii</a>
          <a href="#portfolio" className="hover:underline">Portofoliu</a>
          <a href="#about" className="hover:underline">Despre noi</a>
          <a href="#contact" className="hover:underline">Contact</a>
        </nav>
        <div className="flex items-center gap-2">
          <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} aria-label="Toggle dark mode" className="px-3 py-1 rounded border">
            {theme === 'dark' ? '🌙' : '☀️'}
          </button>
          <button className="md:hidden px-3 py-1 rounded border" onClick={()=>setOpen(!open)} aria-expanded={open} aria-controls="mnav">☰</button>
        </div>
      </div>
      {open && (
        <nav id="mnav" className="md:hidden border-t">
          <div className="container py-3 flex flex-col gap-2">
            <a onClick={()=>setOpen(false)} href="#services">Servicii</a>
            <a onClick={()=>setOpen(false)} href="#portfolio">Portofoliu</a>
            <a onClick={()=>setOpen(false)} href="#about">Despre noi</a>
            <a onClick={()=>setOpen(false)} href="#contact">Contact</a>
          </div>
        </nav>
      )}
    </header>
  )
}
