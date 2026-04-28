import { useEffect, useState } from "react";
import { getCervezas } from "../services/cervezasService";
import ProductCard from "../components/ProductCard";

const BANNER = "https://images.unsplash.com/photo-1535958636474-b021ee887b13?auto=format&fit=crop&w=1920&q=80";

export default function Cervezas() {
  const [cervezas, setCervezas] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getCervezas()
      .then(setCervezas)
      .catch((e) => setError(e.message))
      .finally(() => setCargando(false));
  }, []);

  return (
    <>
      {/* Banner */}
      <section
        className="relative h-56 md:h-72 flex items-center"
        style={{ backgroundImage: `url(${BANNER})`, backgroundSize: "cover", backgroundPosition: "center" }}
      >
        <div className="absolute inset-0 bg-amber-950/80" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 text-white">
          <p className="text-xs tracking-[0.35em] uppercase text-[var(--color-gold)] mb-2">Artesanales</p>
          <h1 className="text-4xl md:text-5xl font-bold" style={{ fontFamily: "var(--font-serif)" }}>
            Cervezas
          </h1>
          <p className="text-white/60 mt-2 text-sm">{!cargando && `${cervezas.length} referencias disponibles`}</p>
        </div>
      </section>

      {/* Grid */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        {cargando ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-[var(--color-cream-dark)] animate-pulse aspect-[3/4]" />
            ))}
          </div>
        ) : error ? (
          <p className="text-red-600">{error}</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {cervezas.map((c) => (
              <ProductCard key={c._id} producto={c} tipo="cerveza" />
            ))}
          </div>
        )}
      </section>
    </>
  );
}
