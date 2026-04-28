import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getVinos } from "../services/vinosService";
import { getCervezas } from "../services/cervezasService";
import ProductCard from "../components/ProductCard";

const HERO_IMAGE = "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=1920&q=80";

export default function Home() {
  const [vinos, setVinos] = useState([]);
  const [cervezas, setCervezas] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    Promise.all([getVinos(), getCervezas()])
      .then(([v, c]) => { setVinos(v); setCervezas(c); })
      .finally(() => setCargando(false));
  }, []);

  return (
    <>
      {/* HERO */}
      <section
        className="relative h-[90vh] min-h-[560px] flex items-center justify-center"
        style={{
          backgroundImage: `url(${HERO_IMAGE})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/55" />
        <div className="relative z-10 text-center text-white px-6 max-w-3xl mx-auto flex flex-col items-center gap-6">
          <p className="text-xs tracking-[0.35em] uppercase text-[var(--color-gold)] mb-2">
            Selección premium
          </p>
          <h1
            className="text-5xl md:text-7xl font-bold leading-tight"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            El placer en cada sorbo
          </h1>
          <p className="text-base md:text-lg text-white/70 max-w-xl leading-relaxed">
            Descubre nuestra colección cuidadosamente seleccionada de vinos y cervezas artesanales de todo el mundo.
          </p>
          <div className="flex gap-4 mt-2">
            <Link
              to="/vinos"
              className="px-7 py-3 text-sm tracking-widest uppercase font-medium bg-[var(--color-gold)] hover:bg-[var(--color-gold-light)] text-[var(--color-wine)] transition"
            >
              Ver vinos
            </Link>
            <Link
              to="/cervezas"
              className="px-7 py-3 text-sm tracking-widest uppercase font-medium border border-white/50 hover:border-white text-white transition"
            >
              Ver cervezas
            </Link>
          </div>
        </div>
        {/* Flecha scroll */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/40 animate-bounce">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </section>

      {/* STRIP VALORES */}
      <section className="bg-[var(--color-wine)]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/10">
          {[
            {
              icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              ),
              title: "Selección cuidada",
              desc: "Cada producto pasa por un riguroso proceso de cata y selección antes de llegar a nuestros estantes.",
            },
            {
              icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                </svg>
              ),
              title: "Origen garantizado",
              desc: "Trabajamos directamente con bodegas y productores locales para garantizar autenticidad y frescura.",
            },
            {
              icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
                </svg>
              ),
              title: "Envío a toda España",
              desc: "Tu pedido llega en 24–48h en condiciones óptimas de temperatura y embalaje.",
            },
          ].map((item) => (
            <div key={item.title} className="flex gap-6 items-start px-10 py-12 group">
              <div className="text-[var(--color-gold)] mt-0.5 shrink-0 opacity-80 group-hover:opacity-100 transition">
                {item.icon}
              </div>
              <div>
                <h3
                  className="text-white text-lg font-semibold mb-2"
                  style={{ fontFamily: "var(--font-serif)" }}
                >
                  {item.title}
                </h3>
                <p className="text-white/55 text-sm leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* BANNER VINOS */}
      <section
        className="relative py-24 flex items-center justify-center"
        style={{
          backgroundImage: `url(https://images.unsplash.com/photo-1474722883778-792e7990302f?auto=format&fit=crop&w=1920&q=80)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      >
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 text-center text-white px-6 max-w-xl">
          <p className="text-xs tracking-[0.35em] uppercase text-[var(--color-gold)] mb-3">Nuestra bodega</p>
          <h2 className="text-4xl font-bold mb-4" style={{ fontFamily: "var(--font-serif)" }}>
            Vinos con alma
          </h2>
          <p className="text-white/70 text-sm leading-relaxed mb-6">
            Desde los viñedos del Priorat hasta las Rías Baixas, cada botella es el resultado de años de dedicación y tradición.
          </p>
          <Link
            to="/vinos"
            className="inline-block px-8 py-3 text-sm tracking-widest uppercase border border-[var(--color-gold)] text-[var(--color-gold)] hover:bg-[var(--color-gold)] hover:text-[var(--color-wine)] transition"
          >
            Explorar vinos
          </Link>
        </div>
      </section>

      {/* VINOS */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="flex items-end justify-between mb-10 border-b border-[var(--color-cream-dark)] pb-5">
          <div>
            <p className="text-xs tracking-[0.3em] uppercase text-[var(--color-gold)] mb-1">Nuestra bodega</p>
            <h2 className="text-3xl font-bold text-[var(--color-wine)]" style={{ fontFamily: "var(--font-serif)" }}>
              Vinos
            </h2>
          </div>
          <Link to="/vinos" className="text-sm tracking-widest uppercase text-[var(--color-text-muted)] hover:text-[var(--color-wine)] transition">
            Ver todos →
          </Link>
        </div>

        {cargando ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-[var(--color-cream-dark)] animate-pulse aspect-[3/4]" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {vinos.slice(0, 4).map((v) => (
              <ProductCard key={v._id} producto={v} tipo="vino" />
            ))}
          </div>
        )}
      </section>

      {/* BANNER INTERMEDIO */}
      <section
        className="relative py-24 flex items-center justify-center"
        style={{
          backgroundImage: `url(https://images.unsplash.com/photo-1535958636474-b021ee887b13?auto=format&fit=crop&w=1920&q=80)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      >
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 text-center text-white px-6 max-w-xl">
          <p className="text-xs tracking-[0.35em] uppercase text-[var(--color-gold)] mb-3">Artesanal y local</p>
          <h2 className="text-4xl font-bold mb-4" style={{ fontFamily: "var(--font-serif)" }}>
            Cervezas con carácter
          </h2>
          <p className="text-white/70 text-sm leading-relaxed mb-6">
            De la lúpulo a la malta, cada cerveza de nuestra selección cuenta una historia única.
          </p>
          <Link
            to="/cervezas"
            className="inline-block px-8 py-3 text-sm tracking-widest uppercase border border-[var(--color-gold)] text-[var(--color-gold)] hover:bg-[var(--color-gold)] hover:text-[var(--color-wine)] transition"
          >
            Explorar cervezas
          </Link>
        </div>
      </section>

      {/* CERVEZAS */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="flex items-end justify-between mb-10 border-b border-[var(--color-cream-dark)] pb-5">
          <div>
            <p className="text-xs tracking-[0.3em] uppercase text-[var(--color-gold)] mb-1">Artesanales</p>
            <h2 className="text-3xl font-bold text-amber-900" style={{ fontFamily: "var(--font-serif)" }}>
              Cervezas
            </h2>
          </div>
          <Link to="/cervezas" className="text-sm tracking-widest uppercase text-[var(--color-text-muted)] hover:text-amber-900 transition">
            Ver todas →
          </Link>
        </div>

        {cargando ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-[var(--color-cream-dark)] animate-pulse aspect-[3/4]" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {cervezas.slice(0, 4).map((c) => (
              <ProductCard key={c._id} producto={c} tipo="cerveza" />
            ))}
          </div>
        )}
      </section>
    </>
  );
}
