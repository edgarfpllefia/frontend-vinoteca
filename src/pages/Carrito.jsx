import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { crearPedido } from "../services/pedidosService";

import { BASE_UPLOADS } from "../config";

export default function Carrito() {
  const { items, quitar, cambiarCantidad, vaciar, total, paraApi } = useCart();
  const [enviando, setEnviando] = useState(false);
  const [exito, setExito] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handlePedido = async () => {
    setError(null);
    setEnviando(true);
    try {
      const { vinos, cervezas } = paraApi();
      await crearPedido(vinos, cervezas);
      vaciar();
      setExito(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setEnviando(false);
    }
  };

  if (exito) {
    return (
      <div className="max-w-lg mx-auto px-6 py-28 text-center flex flex-col items-center gap-6">
        <div
          className="w-16 h-16 rounded-full bg-[var(--color-wine)] flex items-center justify-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7 text-[var(--color-gold)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
        </div>
        <div>
          <p className="text-xs tracking-[0.3em] uppercase text-[var(--color-gold)] mb-2">Confirmado</p>
          <h2 className="text-3xl font-bold text-[var(--color-wine)] mb-3" style={{ fontFamily: "var(--font-serif)" }}>
            Pedido realizado
          </h2>
          <p className="text-[var(--color-text-muted)] text-sm leading-relaxed">
            Tu pedido se ha enviado correctamente.<br />Recibirás confirmación en tu email.
          </p>
        </div>
        <button
          onClick={() => navigate("/")}
          className="mt-2 bg-[var(--color-wine)] hover:bg-[var(--color-wine-light)] text-white text-xs tracking-widest uppercase px-8 py-3 transition"
        >
          Volver al inicio
        </button>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="max-w-lg mx-auto px-6 py-28 text-center flex flex-col items-center gap-6">
        <div className="w-16 h-16 border border-[var(--color-cream-dark)] flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7 text-[var(--color-text-muted)] opacity-40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.836l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
          </svg>
        </div>
        <div>
          <p className="text-xs tracking-[0.3em] uppercase text-[var(--color-gold)] mb-2">Carrito</p>
          <h2 className="text-3xl font-bold text-[var(--color-wine)] mb-3" style={{ fontFamily: "var(--font-serif)" }}>
            Tu carrito está vacío
          </h2>
          <p className="text-[var(--color-text-muted)] text-sm">
            Añade vinos o cervezas de nuestra selección para continuar.
          </p>
        </div>
        <div className="flex gap-3 mt-2">
          <Link
            to="/vinos"
            className="text-xs tracking-widest uppercase px-6 py-3 border border-[var(--color-wine)] text-[var(--color-wine)] hover:bg-[var(--color-wine)] hover:text-white transition"
          >
            Ver vinos
          </Link>
          <Link
            to="/cervezas"
            className="text-xs tracking-widest uppercase px-6 py-3 bg-[var(--color-wine)] text-white hover:bg-[var(--color-wine-light)] transition"
          >
            Ver cervezas
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Cabecera */}
      <div className="border-b border-[var(--color-cream-dark)]">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            <p className="text-xs tracking-[0.3em] uppercase text-[var(--color-gold)]">Mi pedido</p>
            <h1 className="text-2xl font-bold text-[var(--color-wine)]" style={{ fontFamily: "var(--font-serif)" }}>
              Carrito
            </h1>
          </div>
          <span className="text-sm text-[var(--color-text-muted)]">{total} {total === 1 ? "unidad" : "unidades"}</span>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-10 grid md:grid-cols-3 gap-10">

        {/* Lista de items */}
        <div className="md:col-span-2 flex flex-col gap-1">
          {error && (
            <div className="border-l-2 border-red-400 bg-red-50 px-4 py-3 mb-4">
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}

          {items.map(({ producto, cantidad, tipo }) => {
            const imagenUrl = producto.imatge
              ? `${BASE_UPLOADS}${producto.imatge.replace(/^uploads[\\/]/, "")}`
              : null;
            const accentColor = tipo === "vino" ? "var(--color-wine)" : "#92400e";

            return (
              <div
                key={producto._id}
                className="flex gap-5 py-5 border-b border-[var(--color-cream-dark)] items-center"
              >
                {/* Imagen */}
                <div className="w-16 h-20 shrink-0 bg-[var(--color-cream-dark)] overflow-hidden">
                  {imagenUrl ? (
                    <img src={imagenUrl} alt={producto.nom} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-2xl opacity-30">
                      {tipo === "vino" ? "🍷" : "🍺"}
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <p className="text-xs tracking-widest uppercase opacity-50 mb-0.5" style={{ color: accentColor }}>
                    {tipo}
                  </p>
                  <p className="font-semibold text-[var(--color-text)] truncate" style={{ fontFamily: "var(--font-serif)" }}>
                    {producto.nom}
                  </p>
                  <p className="text-xs text-[var(--color-text-muted)] mt-0.5">{producto.graduacio}% vol.</p>
                </div>

                {/* Cantidad */}
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => cambiarCantidad(producto._id, cantidad - 1)}
                    className="w-7 h-7 border border-[var(--color-cream-dark)] text-[var(--color-text-muted)] hover:border-[var(--color-wine)] hover:text-[var(--color-wine)] transition text-sm flex items-center justify-center"
                  >
                    −
                  </button>
                  <span className="w-6 text-center text-sm font-medium">{cantidad}</span>
                  <button
                    onClick={() => cambiarCantidad(producto._id, cantidad + 1)}
                    className="w-7 h-7 border border-[var(--color-cream-dark)] text-[var(--color-text-muted)] hover:border-[var(--color-wine)] hover:text-[var(--color-wine)] transition text-sm flex items-center justify-center"
                  >
                    +
                  </button>
                </div>

                {/* Eliminar */}
                <button
                  onClick={() => quitar(producto._id)}
                  className="shrink-0 text-[var(--color-text-muted)] hover:text-red-500 transition ml-2"
                  title="Eliminar"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            );
          })}

          <button
            onClick={vaciar}
            className="mt-4 text-xs text-[var(--color-text-muted)] hover:text-red-500 transition w-fit"
          >
            Vaciar carrito
          </button>
        </div>

        {/* Resumen */}
        <div className="md:col-span-1">
          <div className="border border-[var(--color-cream-dark)] p-6 flex flex-col gap-5 sticky top-24">
            <p className="text-xs tracking-widest uppercase text-[var(--color-text-muted)]">Resumen</p>

            <div className="flex flex-col gap-3 text-sm border-b border-[var(--color-cream-dark)] pb-5">
              {items.map(({ producto, cantidad }) => (
              <div key={producto._id} className="flex justify-between gap-2">
              <span className="text-[var(--color-text-muted)] truncate">{producto.nom}</span>
              <span className="shrink-0 font-medium">
                  {producto.preu != null
                      ? `${(Number(producto.preu) * cantidad).toFixed(2)} €`
                      : `× ${cantidad}`}
                  </span>
                </div>
              ))}
            </div>

            {(() => {
              const todosTienenPrecio = items.every(i => i.producto.preu != null);
              const totalEuros = items.reduce((acc, i) => acc + Number(i.producto.preu ?? 0) * i.cantidad, 0);
              return (
                <div className="flex justify-between text-sm font-semibold">
                  <span className="text-[var(--color-text-muted)]">{todosTienenPrecio ? "Total" : "Total unidades"}</span>
                  <span className="text-[var(--color-wine)]">
                    {todosTienenPrecio ? `${totalEuros.toFixed(2)} €` : total}
                  </span>
                </div>
              );
            })()}

            <button
              onClick={handlePedido}
              disabled={enviando}
              className="w-full bg-[var(--color-wine)] hover:bg-[var(--color-wine-light)] text-white text-xs tracking-widest uppercase py-4 transition disabled:opacity-50"
            >
              {enviando ? "Enviando..." : "Realizar pedido"}
            </button>

            <Link
              to="/"
              className="text-center text-xs text-[var(--color-text-muted)] hover:text-[var(--color-wine)] transition"
            >
              ← Seguir comprando
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
