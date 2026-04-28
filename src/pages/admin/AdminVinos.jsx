import { useEffect, useState } from "react";
import { getVinos, deleteVino } from "../../services/vinosService";
import { useNavigate } from "react-router-dom";
import { usePaginacion } from "../../hooks/usePaginacion";
import Paginacion from "../../components/Paginacion";

import { BASE_UPLOADS } from "../../config";

export default function AdminVinos() {
  const [vinos, setVinos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const [busqueda, setBusqueda] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    getVinos()
      .then(setVinos)
      .catch((e) => setError(e.message))
      .finally(() => setCargando(false));
  }, []);

  const handleDelete = async (id, nom) => {
    if (!confirm(`¿Eliminar "${nom}"?`)) return;
    try {
      await deleteVino(id);
      setVinos((prev) => prev.filter((v) => v._id !== id));
    } catch (e) {
      alert(e.message);
    }
  };

  const filtrados = vinos.filter((v) =>
    v.nom.toLowerCase().includes(busqueda.toLowerCase()) ||
    v.tipus?.toLowerCase().includes(busqueda.toLowerCase())
  );

  const { paginados, pagina, totalPaginas, irA } = usePaginacion(filtrados);

  return (
    <div className="flex flex-col gap-6">
      {/* Stats + acciones */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex gap-4">
          <div className="bg-white border border-gray-200 rounded px-5 py-3">
            <p className="text-xs text-gray-400 uppercase tracking-wide mb-0.5">Total</p>
            <p className="text-2xl font-bold text-[var(--color-wine)]" style={{ fontFamily: "var(--font-serif)" }}>
              {cargando ? "—" : vinos.length}
            </p>
          </div>
        </div>
        <button
          onClick={() => navigate("/admin/vinos/nuevo")}
          className="flex items-center gap-2 bg-[var(--color-wine)] hover:bg-[var(--color-wine-light)] text-white text-sm px-5 py-2.5 transition"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          Nuevo vino
        </button>
      </div>

      {/* Tabla */}
      <div className="bg-white border border-gray-200">
        {/* Buscador */}
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
              {paginados.map((v) => (
                <tr key={v._id} className="hover:bg-gray-50 transition-colors group">
                  <td className="px-5 py-3">
                    {v.imatge ? (
                      <img
                        src={`${BASE_UPLOADS}${v.imatge.replace(/^uploads[\\/]/, "")}`}
                        alt={v.nom}
                        className="w-10 h-10 object-cover"
                      />
                    ) : (
                      <div className="w-10 h-10 bg-[var(--color-cream-dark)] flex items-center justify-center text-lg opacity-40">🍷</div>
                    )}
                  </td>
                  <td className="px-5 py-3">
                    <p className="font-medium text-gray-800">{v.nom}</p>
                    {v.descripcio && (
                      <p className="text-xs text-gray-400 mt-0.5 line-clamp-1 hidden sm:block">{v.descripcio}</p>
                    )}
                  </td>
                  <td className="px-5 py-3 text-gray-500 hidden md:table-cell">{v.tipus}</td>
                  <td className="px-5 py-3 text-gray-500 hidden md:table-cell">{v.graduacio}%</td>
                  <td className="px-5 py-3 text-right">
                    <div className="flex gap-3 justify-end opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => navigate(`/admin/vinos/${v._id}/editar`)}
                        className="text-xs text-[var(--color-wine)] hover:underline font-medium"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => handleDelete(v._id, v.nom)}
                        className="text-xs text-red-500 hover:underline font-medium"
                      >
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
