import { useEffect, useState } from "react";
import { getVinos } from "../services/vinosService";
import ProductCard from "../components/ProductCard";

const BANNER = "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=1920&q=80";

export default function Vinos() {
  const [vinos, setVinos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getVinos()
      .then(setVinos)
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
        <div className="absolute inset-0 bg-[var(--color-wine)]/80" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 text-white">
          <p className="text-xs tracking-[0.35em] uppercase text-[var(--color-gold)] mb-2">Nuestra bodega</p>
          <h1 className="text-4xl md:text-5xl font-bold" style={{ fontFamily: "var(--font-serif)" }}>
            Vinos
          </h1>
          <p className="text-white/60 mt-2 text-sm">{!cargando && `${vinos.length} referencias disponibles`}</p>
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
            {vinos.map((v) => (
              <ProductCard key={v._id} producto={v} tipo="vino" />
            ))}
          </div>
        )}
      </section>
    </>
  );
}
