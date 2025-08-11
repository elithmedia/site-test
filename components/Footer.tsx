export default function Footer(){
  return (
    <footer className="footer mt-20">
      <div className="container py-10">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <div className="text-lg font-semibold">Elith Media</div>
            <p className="text-sm text-white/75 mt-2">
              TH NETWORK AND SOCIAL MEDIA S.R.L. • CUI 51118397
            </p>
            <p className="text-sm text-white/60 mt-1">
              București, Sector 6, Str. Vlădeasa nr. 7, Bl. C34, Sc. 1, Et. 5, Ap. 35
            </p>
          </div>
          <div>
            <div className="text-sm font-semibold">Linkuri</div>
            <ul className="mt-2 space-y-1 text-sm">
              <li><a href="/terms">Termeni</a></li>
              <li><a href="/privacy">Confidențialitate</a></li>
              <li><a href="/cookies">Cookie-uri</a></li>
              <li><a href="/sitemap.xml">Sitemap</a></li>
            </ul>
          </div>
          <div>
            <div className="text-sm font-semibold">Contact</div>
            <ul className="mt-2 space-y-1 text-sm">
              <li><a href="mailto:contact@elithmedia.com">contact@elithmedia.com</a></li>
              <li><a href="tel:+40XXXXXXXXX">+40 XXX XXX XXX</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 text-xs text-white/50">
          © {new Date().getFullYear()} Elith Media. Toate drepturile rezervate.
        </div>
      </div>
    </footer>
  )
}
