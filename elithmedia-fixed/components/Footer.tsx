export default function Footer() {
  return (
    <footer className="border-t mt-16">
      <div className="container py-10 grid md:grid-cols-3 gap-8 text-sm">
        <div>
          <div className="font-semibold mb-2">Elith Media</div>
          <p className="opacity-80">
            TH NETWORK AND SOCIAL MEDIA S.R.L. (Elith Media)<br/>
            CUI: 51118397 | ORC: —<br/>
            HQ: Bucuresti, Sector 6, Str. Vladeasa nr. 7, Bl. C34, Sc. 1, Et. 5, Ap. 35<br/>
            Email: <a href="mailto:contact@elithmedia.com" className="underline">contact@elithmedia.com</a>
          </p>
        </div>
        <div>
          <div className="font-semibold mb-2">Link-uri</div>
          <ul className="space-y-1">
            <li><a className="hover:underline" href="/terms">Termeni si conditii</a></li>
            <li><a className="hover:underline" href="/privacy">Politica de confidentialitate</a></li>
            <li><a className="hover:underline" href="/cookies">Politica de cookie</a></li>
            <li><a className="hover:underline" href="https://anpc.ro/ce-este-sal/" target="_blank" rel="noopener">SOL/ANPC</a></li>
            <li><a className="hover:underline" href="/sitemap.xml">Sitemap</a></li>
            <li><button className="underline" onClick={()=>{
              if (typeof window !== 'undefined' && window.__cmp) window.__cmp('getConsent', null, (c:any)=>alert(JSON.stringify(c, null, 2)))
            }}>Setari cookie</button></li>
          </ul>
        </div>
        <div className="opacity-70">
          <p>&copy; {new Date().getFullYear()} Elith Media. Toate drepturile rezervate.</p>
        </div>
      </div>
    </footer>
  )
}
