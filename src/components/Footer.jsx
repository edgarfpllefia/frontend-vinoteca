import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-[var(--color-wine)] text-[var(--color-cream-dark)]">

      {/* Franja superior dorada */}
      <div className="h-px bg-[var(--color-gold)] opacity-30" />

      <div className="max-w-7xl mx-auto px-6 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">

          {/* Marca — ocupa 4 columnas */}
          <div className="md:col-span-4 flex flex-col gap-5">
            <Link to="/" className="flex items-center gap-2.5" style={{ fontFamily: "var(--font-serif)" }}>
              <span className="text-[var(--color-gold)]">✦</span>
              <span className="text-white text-xl font-semibold tracking-wide">Vinoteca</span>
            </Link>
            <p className="text-sm leading-relaxed text-white/50 max-w-xs">
              Selección cuidada de vinos y cervezas artesanales. Calidad y pasión en cada botella desde 2010.
            </p>
            <div className="flex items-center gap-1 mt-1">
              <span className="text-[var(--color-gold)] opacity-60 text-xs">✦ ✦ ✦</span>
            </div>
          </div>

          {/* Separador vertical solo en md+ */}
          <div className="hidden md:block md:col-span-1">
            <div className="h-full w-px bg-white/10 mx-auto" />
          </div>

          {/* Navegación — 3 columnas */}
          <div className="md:col-span-3 flex flex-col gap-4">
            <p
              className="text-[var(--color-gold)] text-xs tracking-[0.25em] uppercase mb-1"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              Explorar
            </p>
            <nav className="flex flex-col gap-3">
              {[
                { to: "/vinos", label: "Vinos" },
                { to: "/cervezas", label: "Cervezas" },
                { to: "/sobre-nosotros", label: "Sobre nosotros" },
                { to: "/contacto", label: "Contacto" },
              ].map(({ to, label }) => (
                <Link
                  key={to}
                  to={to}
                  className="text-sm text-white/55 hover:text-white transition-colors duration-200 w-fit"
                >
                  {label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contacto — 4 columnas */}
          <div className="md:col-span-4 flex flex-col gap-4">
            <p
              className="text-[var(--color-gold)] text-xs tracking-[0.25em] uppercase mb-1"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              Contacto
            </p>
            <div className="flex flex-col gap-3">
              {[
                {
                  icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                    </svg>
                  ),
                  content: <span>Carrer del Vi, 14<br />08001 Barcelona</span>,
                },
                {
                  icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                    </svg>
                  ),
                  content: <a href="mailto:hola@vinoteca.com" className="hover:text-white transition-colors">hola@vinoteca.com</a>,
                },
                {
                  icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                    </svg>
                  ),
                  content: <a href="tel:+34931234567" className="hover:text-white transition-colors">+34 93 123 45 67</a>,
                },
                {
                  icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  ),
                  content: <span>Lun–Vie 10:00–20:00 · Sáb 10:00–14:00</span>,
                },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-2.5 text-sm text-white/55">
                  <span className="text-[var(--color-gold)] opacity-70">{item.icon}</span>
                  {item.content}
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* Barra inferior */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-white/30 tracking-wide">
            © {new Date().getFullYear()} Vinoteca · Todos los derechos reservados
          </p>
          <p className="text-xs text-white/20 tracking-wide">
            Hecho con pasión en Barcelona
          </p>
        </div>
      </div>

    </footer>
  );
}
