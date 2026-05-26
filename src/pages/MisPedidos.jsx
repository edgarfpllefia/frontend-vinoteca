import { useEffect, useState } from "react";
import { getMisPedidos } from "../services/pedidosService";
import { getImageUrl } from "../config";

export default function MisPedidos() {
  const [pedidos, setPedidos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getMisPedidos()
      .then((res) => setPedidos(res.datos))
      .catch((e) => setError(e.message))
      .finally(() => setCargando(false));
  }, []);

  if (cargando) return (
    <div className="max-w-3xl mx-auto px-6 py-20 text-center">
      <p className="text-[var(--color-text-muted)] text-sm tracking-wide">Cargando pedidos...</p>
    </div>
  );

  if (error) return (
    <div className="max-w-3xl mx-auto px-6 py-20 text-center">
      <p className="text-red-500 text-sm">{error}</p>
    </div>
  );

  return (
    <div className="max-w-3xl mx-auto px-6 py-14">
      <div className="mb-10">
        <p className="text-xs tracking-[0.3em] uppercase text-[var(--color-gold)] mb-2">Historial</p>
        <h1 className="text-3xl font-bold text-[var(--color-wine)]" style={{ fontFamily: "var(--font-serif)" }}>
          Mis pedidos
        </h1>
      </div>

      {pedidos.length === 0 ? (
        <div className="border border-[var(--color-cream-dark)] px-8 py-16 text-center">
          <p className="text-[var(--color-text-muted)] text-sm">Todavía no has realizado ningún pedido.</p>
        </div>
      ) : (
        <div className="flex flex-col gap-6">
          {pedidos.map((pedido) => {
            const items = [
              ...pedido.vinos.map((v) => ({ ...v, tipo: "vino" })),
              ...pedido.cervezas.map((c) => ({ ...c, tipo: "cerveza" })),
            ];

            const total = items.reduce((acc, i) => acc + (i.producto?.preu ?? 0) * i.cantidad, 0);

            const fecha = new Date(pedido.createdAt).toLocaleDateString("es-ES", {
              day: "numeric", month: "long", year: "numeric",
            });

            return (
              <div key={pedido._id} className="border border-[var(--color-cream-dark)]">
                <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--color-cream-dark)] bg-[var(--color-cream)]">
                  <div>
                    <p className="text-xs tracking-widest uppercase text-[var(--color-text-muted)] mb-0.5">Pedido</p>
                    <p className="text-xs font-mono text-[var(--color-wine)]">{pedido._id}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-[var(--color-text-muted)]">{fecha}</p>
                    {total > 0 && (
                      <p className="text-sm font-semibold text-[var(--color-wine)] mt-0.5">{total.toFixed(2)} €</p>
                    )}
                  </div>
                </div>

                <div className="px-6 py-4 flex flex-col gap-3">
                  {items.map((item, i) => {
                    const imagenUrl = getImageUrl(item.producto?.imatge);
                    return (
                      <div key={i} className="flex items-center gap-4">
                        <div className="w-10 h-10 shrink-0 bg-[var(--color-cream-dark)] overflow-hidden">
                          {imagenUrl ? (
                            <img src={imagenUrl} alt={item.producto?.nom} className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-lg opacity-30">
                              {item.tipo === "vino" ? "🍷" : "🍺"}
                            </div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-[var(--color-text)] truncate">
                            {item.producto?.nom ?? "Producto eliminado"}
                          </p>
                          <p className="text-xs text-[var(--color-text-muted)]">× {item.cantidad}</p>
                        </div>
                        {item.producto?.preu != null && (
                          <p className="text-sm font-medium text-[var(--color-wine)] shrink-0">
                            {(item.producto.preu * item.cantidad).toFixed(2)} €
                          </p>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
