const BANNER = "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?auto=format&fit=crop&w=1920&q=80";

export default function SobreNosotros() {
  return (
    <>
      {/* Banner */}
      <section
        className="relative h-56 md:h-72 flex items-center"
        style={{ backgroundImage: `url(${BANNER})`, backgroundSize: "cover", backgroundPosition: "center" }}
      >
        <div className="absolute inset-0 bg-[var(--color-wine)]/75" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 text-white">
          <p className="text-xs tracking-[0.35em] uppercase text-[var(--color-gold)] mb-2">Quiénes somos</p>
          <h1 className="text-4xl md:text-5xl font-bold" style={{ fontFamily: "var(--font-serif)" }}>
            Sobre nosotros
          </h1>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-16 items-start">
        {/* Historia */}
        <div className="flex flex-col gap-5">
          <p className="text-xs tracking-[0.3em] uppercase text-[var(--color-gold)]">Nuestra historia</p>
          <h2 className="text-3xl font-bold text-[var(--color-wine)]" style={{ fontFamily: "var(--font-serif)" }}>
            Más de una década de pasión por el vino
          </h2>
          <p className="text-[var(--color-text-muted)] leading-relaxed text-sm">
            Fundada en 2010, Vinoteca nació del deseo de acercar los mejores vinos y cervezas artesanales a los amantes de las bebidas de calidad. Lo que empezó como una pequeña tienda en el Eixample barcelonés se ha convertido en un referente de la ciudad.
          </p>
          <p className="text-[var(--color-text-muted)] leading-relaxed text-sm">
            Trabajamos directamente con bodegas y productores para garantizar la autenticidad y frescura de cada producto. Cada botella que llega a nuestras estanterías ha pasado por nuestro riguroso proceso de selección.
          </p>
        </div>

        {/* Valores */}
        <div className="flex flex-col gap-6">
          <p className="text-xs tracking-[0.3em] uppercase text-[var(--color-gold)]">Nuestros valores</p>
          {[
            { titulo: "Calidad ante todo", desc: "Solo trabajamos con productores que comparten nuestra obsesión por la excelencia." },
            { titulo: "Sostenibilidad", desc: "Priorizamos bodegas con prácticas sostenibles y respeto por el medioambiente." },
            { titulo: "Cercanía", desc: "Somos un equipo pequeño y apasionado. Siempre hay alguien dispuesto a asesorarte." },
          ].map((v) => (
            <div key={v.titulo} className="border-l-2 border-[var(--color-gold)] pl-5">
              <h3 className="font-semibold text-[var(--color-wine)] mb-1" style={{ fontFamily: "var(--font-serif)" }}>
                {v.titulo}
              </h3>
              <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Donde estamos */}
      <section className="bg-[var(--color-cream-dark)] py-16">
        <div className="max-w-5xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <div className="flex flex-col gap-4">
            <p className="text-xs tracking-[0.3em] uppercase text-[var(--color-gold)]">Dónde estamos</p>
            <h2 className="text-3xl font-bold text-[var(--color-wine)]" style={{ fontFamily: "var(--font-serif)" }}>
              Visítanos
            </h2>
            <div className="flex flex-col gap-3 text-sm text-[var(--color-text-muted)]">
              <p>📍 Carrer del Vi, 14 — 08001 Barcelona</p>
              <p>🕐 Lun–Vie: 10:00–20:00 · Sáb: 10:00–14:00</p>
              <p>📞 +34 93 123 45 67</p>
              <p>✉️ hola@vinoteca.com</p>
            </div>
          </div>

          {/* Mapa placeholder */}
          <div className="w-full h-64 bg-[var(--color-wine)]/10 border border-[var(--color-cream-dark)] flex items-center justify-center text-[var(--color-text-muted)] text-sm">
            [ Mapa — integrar Google Maps aquí ]
          </div>
        </div>
      </section>
    </>
  );
}
