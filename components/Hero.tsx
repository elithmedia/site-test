export default function Hero(){
  return (
    <section className="section">
      <div className="container">
        <div className="lg p-8 md:p-12">
          <div className="grid md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-8">
              <h1 className="text-4xl md:text-5xl">
                Conținut și campanii care aduc <span style={{backgroundImage:'linear-gradient(90deg, hsl(var(--acc)), hsl(var(--acc-2)))',WebkitBackgroundClip:'text',backgroundClip:'text',color:'transparent'}}>leaduri</span>.
              </h1>
              <p className="muted mt-4 max-w-2xl">
                TikTok, Instagram, YouTube Shorts + Meta & Google Ads. Rezultate clare, raportare curată.
              </p>
              <div className="mt-6 flex gap-3">
                <a href="#contact" className="btn btn-primary">Cere ofertă</a>
                <a href="#portfolio" className="btn">Vezi portofoliul</a>
              </div>
            </div>
            <div className="md:col-span-4">
              <div className="card-2 p-5">
                <div className="aspect-video rounded-[12px] bg-black/50 border border-white/10" />
                <p className="text-xs text-white/60 mt-3">Preview placeholder</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
