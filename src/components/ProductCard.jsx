import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

import { BASE_UPLOADS } from "../config";

export default function ProductCard({ producto, tipo }) {
  const { añadir } = useCart();
  const { usuario } = useAuth();
  const navigate = useNavigate();

  const handleAñadir = () => {
    if (!usuario) { navigate("/login"); return; }
    añadir(producto, tipo);
  };

  const imagenUrl = producto.imatge
    ? `${BASE_UPLOADS}${producto.imatge.replace(/^uploads[\\/]/, "")}`
    : null;

  const rutaDetalle = tipo === "vino" ? `/vinos/${producto._id}` : `/cervezas/${producto._id}`;
  const accentColor = tipo === "vino" ? "var(--color-wine)" : "#92400e";

  return (
    <article className="bg-white flex flex-col group border border-[var(--color-cream-dark)] hover:border-[var(--color-gold)] transition-colors duration-300">
      {/* Imagen */}
      <div className="overflow-hidden aspect-[3/4] bg-[var(--color-cream)]">
        {imagenUrl ? (
          <img
            src={imagenUrl}
            alt={producto.nom}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-6xl opacity-30">
            {tipo === "vino" ? "🍷" : "🍺"}
          </div>
        )}
      </div>

      {/* Contenido */}
      <div className="p-5 flex flex-col flex-1 gap-3">
        <div>
          <p className="text-xs tracking-widest uppercase opacity-50 mb-1" style={{ color: accentColor }}>
            {producto.tipus}
          </p>
          <h3
            className="text-lg font-semibold leading-tight"
            style={{ fontFamily: "var(--font-serif)", color: accentColor }}
          >
            {producto.nom}
          </h3>
          <p className="text-xs text-[var(--color-text-muted)] mt-1">{producto.graduacio}% vol.</p>
          {producto.preu != null && (
            <p className="text-base font-semibold mt-1" style={{ color: accentColor }}>
              {Number(producto.preu).toFixed(2)} €
            </p>
          )}
        </div>

        {producto.descripcio && (
          <p className="text-sm text-[var(--color-text-muted)] leading-relaxed line-clamp-2 flex-1">
            {producto.descripcio}
          </p>
        )}

        <div className="flex gap-2 mt-auto pt-2 border-t border-[var(--color-cream-dark)]">
          <Link
            to={rutaDetalle}
            className="flex-1 text-center text-xs tracking-widest uppercase py-2 border transition-colors duration-200"
            style={{ borderColor: accentColor, color: accentColor }}
            onMouseEnter={e => { e.currentTarget.style.background = accentColor; e.currentTarget.style.color = "white"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = accentColor; }}
          >
            Ver más
          </Link>
          <button
            onClick={() => handleAñadir()}
            className="flex-1 text-xs tracking-widest uppercase py-2 text-white transition-opacity duration-200 hover:opacity-80"
            style={{ backgroundColor: accentColor }}
          >
            + Carrito
          </button>
        </div>
      </div>
    </article>
  );
}
