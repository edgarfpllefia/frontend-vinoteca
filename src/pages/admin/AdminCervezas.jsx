import { useEffect, useState } from "react";
import { getCervezas, deleteCerveza } from "../../services/cervezasService";
import { useNavigate } from "react-router-dom";
import { usePaginacion } from "../../hooks/usePaginacion";
import Paginacion from "../../components/Paginacion";
import { getImageUrl } from "../../config";

export default function AdminCervezas() {
  const [cervezas, setCervezas] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const [busqueda, setBusqueda] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    getCervezas()
      .then(setCervezas)
      .catch((e) => setError(e.message))
      .finally(() => setCargando(false));
  }, []);

  const handleDelete = async (id, nom) => {
    if (!confirm(`¿Eliminar "${nom}"?`)) return;
    try {
      await deleteCerveza(id);
      setCervezas((prev) => prev.filter((c) => c._id !== id));
    } catch (e) {
      alert(e.message);
    }
  };

  const filtrados = cervezas.filter((c) =>
    c.nom.toLowerCase().includes(busqueda.toLowerCase()) ||
    c.tipus?.toLowerCase().includes(busqueda.toLowerCase())
  );

  const { paginados, pagina, totalPaginas, irA } = usePaginacion(filtrados);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex gap-4">
          <div className="bg-white border border-gray-200 rounded px-5 py-3">
            <p className="text-xs text-gray-400 uppercase tracking-wide mb-0.5">Total</p>
            <p className="text-2xl font-bold text-amber-800" style={{ fontFamily: "var(--font-serif)" }}>
              {cargando ? "—" : cervezas.length}
            </p>
          </div>
        </div>
        <button
          onClick={() => navigate("/admin/cervezas/nuevo")}
          className="flex items-center gap-2 bg-amber-800 hover:bg-amber-900 text-white text-sm px-5 py-2.5 transition"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          Nueva cerveza
        </button>
      </div>

      <div className="bg-white border border-gray-200">
        <div className="px-5 py-4 border-b border-gray-100 flex items-center gap-3">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-gray-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
          </svg>
          <input
            type="text"
            placeholder="Buscar por nombre o tipo..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            className="text-sm flex-1 focus:outline-none text-gray-700 placeholder-gray-400"
          />
          {busqueda && (
            <button onClick={() => setBusqueda("")} className="text-gray-400 hover:text-gray-600 text-xs">✕</button>
          )}
        </div>

        {cargando ? (
          <div className="p-8 text-center text-sm text-gray-400">Cargando...</div>
        ) : error ? (
          <div className="p-8 text-center text-sm text-red-500">{error}</div>
        ) : filtrados.length === 0 ? (
          <div className="p-8 text-center text-sm text-gray-400">No se encontraron resultados.</div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="px-5 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wide w-14"></th>
                <th className="px-5 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wide">Nombre</th>
                <th className="px-5 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wide hidden md:table-cell">Tipo</th>
                <th className="px-5 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wide hidden md:table-cell">Graduación</th>
                <th className="px-5 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wide">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {paginados.map((c) => (
                <tr key={c._id} className="hover:bg-gray-50 transition-colors group">
                  <td className="px-5 py-3">
                    {c.imatge ? (
                      <img src={getImageUrl(c.imatge)} alt={c.nom} className="w-10 h-10 object-cover" />
                    ) : (
                      <div className="w-10 h-10 bg-amber-50 flex items-center justify-center text-lg opacity-40">🍺</div>
                    )}
                  </td>
                  <td className="px-5 py-3">
                    <p className="font-medium text-gray-800">{c.nom}</p>
                    {c.descripcio && (
                      <p className="text-xs text-gray-400 mt-0.5 line-clamp-1 hidden sm:block">{c.descripcio}</p>
                    )}
                  </td>
                  <td className="px-5 py-3 text-gray-500 hidden md:table-cell">{c.tipus}</td>
                  <td className="px-5 py-3 text-gray-500 hidden md:table-cell">{c.graduacio}%</td>
                  <td className="px-5 py-3 text-right">
                    <div className="flex gap-3 justify-end opacity-0 group-hover:opacity-100 transition-opacity">
                      <button onClick={() => navigate(`/admin/cervezas/${c._id}/editar`)}
                        className="text-xs text-amber-800 hover:underline font-medium">
                        Editar
                      </button>
                      <button onClick={() => handleDelete(c._id, c.nom)}
                        className="text-xs text-red-500 hover:underline font-medium">
                        Eliminar
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        <div className="px-5 pb-4">
          <Paginacion pagina={pagina} totalPaginas={totalPaginas} irA={irA} />
        </div>
      </div>
    </div>
  );
}
