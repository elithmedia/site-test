'use client'

export default function Nav(){
  const links = [
    { href: '#about', label: 'Despre noi' },
    { href: '#portfolio', label: 'Portofoliu' },
    { href: '#contact', label: 'Contact' },
  ]
  return (
    <header className="navbar">
      <div className="nav-inner">
        <a href="/" className="wordmark">Elith Media</a>

        <nav className="nav-links">
          {links.map(l => (
            <a key={l.href} href={l.href} className="nav-link">{l.label}</a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a href="#portfolio" className="btn btn-ghost hidden md:inline-flex">Portofoliu</a>
          <a href="#contact" className="btn btn-primary">Cere ofertă</a>
        </div>
      </div>
    </header>
  )
}