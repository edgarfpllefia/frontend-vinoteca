import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getCervezaById } from "../services/cervezasService";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { getImageUrl } from "../config";

export default function CervezaDetalle() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { añadir } = useCart();
  const { usuario } = useAuth();
  const [cerveza, setCerveza] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const [añadido, setAñadido] = useState(false);

  useEffect(() => {
    getCervezaById(id)
      .then(setCerveza)
      .catch((e) => setError(e.message))
      .finally(() => setCargando(false));
  }, [id]);

  const handleAñadir = () => {
    if (!usuario) { navigate("/login"); return; }
    añadir(cerveza, "cerveza");
    setAñadido(true);
    setTimeout(() => setAñadido(false), 2000);
  };

  if (cargando) return (
    <div className="max-w-6xl mx-auto px-6 py-20 flex items-center justify-center">
      <p className="text-[var(--color-text-muted)] text-sm tracking-wide">Cargando...</p>
    </div>
  );

  if (error) return (
    <div className="max-w-6xl mx-auto px-6 py-20 text-center">
      <p className="text-red-500 text-sm">{error}</p>
    </div>
  );

  if (!cerveza) return null;

  const imagenUrl = getImageUrl(cerveza.imatge);

  return (
    <>
      <div className="border-b border-[var(--color-cream-dark)]">
        <div className="max-w-6xl mx-auto px-6 py-3 flex items-center gap-2 text-xs text-[var(--color-text-muted)]">
          <button onClick={() => navigate("/")} className="hover:text-amber-800 transition">Inicio</button>
          <span>/</span>
          <button onClick={() => navigate("/cervezas")} className="hover:text-amber-800 transition">Cervezas</button>
          <span>/</span>
          <span className="text-amber-800 font-medium">{cerveza.nom}</span>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-14 grid md:grid-cols-2 gap-16 items-start">
        <div className="sticky top-24">
          {imagenUrl ? (
            <div className="overflow-hidden bg-[var(--color-cream-dark)] aspect-[3/4]">
              <img src={imagenUrl} alt={cerveza.nom} className="w-full h-full object-cover" />
            </div>
          ) : (
            <div className="aspect-[3/4] bg-amber-50 flex items-center justify-center">
              <span className="text-8xl opacity-20">🍺</span>
            </div>
          )}
        </div>

        <div className="flex flex-col gap-8 pt-2">
          <div>
            <p className="text-xs tracking-[0.3em] uppercase text-[var(--color-gold)] mb-3">{cerveza.tipus}</p>
            <h1 className="text-4xl font-bold text-amber-900 leading-tight mb-4" style={{ fontFamily: "var(--font-serif)" }}>
              {cerveza.nom}
            </h1>
            <div className="flex items-center gap-3">
              <span className="text-sm text-[var(--color-text-muted)] border border-[var(--color-cream-dark)] px-3 py-1">{cerveza.graduacio}% vol.</span>
              <span className="text-sm text-[var(--color-text-muted)] border border-[var(--color-cream-dark)] px-3 py-1 capitalize">{cerveza.tipus}</span>
              {cerveza.preu != null && (
                <span className="text-lg font-bold text-amber-900" style={{ fontFamily: "var(--font-serif)" }}>
                  {Number(cerveza.preu).toFixed(2)} €
                </span>
              )}
            </div>
          </div>

          {cerveza.descripcio && (
            <div className="border-t border-[var(--color-cream-dark)] pt-6">
              <p className="text-xs tracking-widest uppercase text-[var(--color-text-muted)] mb-3">Descripción</p>
              <p className="text-[var(--color-text)] leading-relaxed text-sm">{cerveza.descripcio}</p>
            </div>
          )}

          <div className="border-t border-[var(--color-cream-dark)] pt-6">
            <p className="text-xs tracking-widest uppercase text-[var(--color-text-muted)] mb-4">Ficha técnica</p>
            <dl className="flex flex-col gap-3">
              {[
                { label: "Nombre", value: cerveza.nom },
                { label: "Tipo", value: cerveza.tipus },
                { label: "Graduación", value: `${cerveza.graduacio}% vol.` },
                ...(cerveza.preu != null ? [{ label: "Precio", value: `${Number(cerveza.preu).toFixed(2)} €` }] : []),
              ].map(({ label, value }) => (
                <div key={label} className="flex justify-between text-sm border-b border-[var(--color-cream-dark)] pb-2">
                  <dt className="text-[var(--color-text-muted)]">{label}</dt>
                  <dd className="font-medium text-[var(--color-text)] capitalize">{value}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="flex flex-col gap-3 pt-2">
            <button onClick={handleAñadir} className="w-full py-4 text-xs tracking-widest uppercase font-medium transition-colors"
              style={{ backgroundColor: añadido ? "var(--color-gold)" : "#92400e", color: añadido ? "#92400e" : "white" }}>
              {añadido ? "✓ Añadido al carrito" : "Añadir al carrito"}
            </button>
            <button
              onClick={() => { if (!usuario) { navigate("/login"); return; } añadir(cerveza, "cerveza"); navigate("/carrito"); }}
              className="w-full py-4 text-xs tracking-widest uppercase font-medium border border-amber-800 text-amber-800 hover:bg-amber-800 hover:text-white transition-colors">
              Comprar ahora
            </button>
          </div>

          <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-xs text-[var(--color-text-muted)] hover:text-amber-800 transition w-fit">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            Volver
          </button>
        </div>
      </div>
    </>
  );
}
