import { useEffect, useState } from "react";
import { getUsuarios, updateUsuario, deleteUsuario } from "../../services/usuariosService";
import { usePaginacion } from "../../hooks/usePaginacion";
import Paginacion from "../../components/Paginacion";

import { BASE_UPLOADS } from "../../config";
const ROLES = ["usuari", "editor", "admin"];

const rolBadge = {
  admin: "bg-[var(--color-wine)]/10 text-[var(--color-wine)]",
  editor: "bg-blue-50 text-blue-700",
  usuari: "bg-gray-100 text-gray-500",
};

export default function AdminUsuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const [editandoRol, setEditandoRol] = useState(null);
  const [busqueda, setBusqueda] = useState("");

  useEffect(() => {
    getUsuarios()
      .then(setUsuarios)
      .catch((e) => setError(e.message))
      .finally(() => setCargando(false));
  }, []);

  const handleRolChange = async (id, nuevoRol) => {
    try {
      await updateUsuario(id, { rol: nuevoRol });
      setUsuarios((prev) => prev.map((u) => (u._id === id ? { ...u, rol: nuevoRol } : u)));
    } catch (e) {
      alert(e.message);
    } finally {
      setEditandoRol(null);
    }
  };

  const handleDelete = async (id, name) => {
    if (!confirm(`¿Eliminar al usuario "${name}"? Esta acción no se puede deshacer.`)) return;
    try {
      await deleteUsuario(id);
      setUsuarios((prev) => prev.filter((u) => u._id !== id));
    } catch (e) {
      alert(e.message);
    }
  };

  const filtrados = usuarios.filter((u) =>
    u.name?.toLowerCase().includes(busqueda.toLowerCase()) ||
    u.email?.toLowerCase().includes(busqueda.toLowerCase())
  );

  const { paginados, pagina, totalPaginas, irA } = usePaginacion(filtrados);

  return (
    <div className="flex flex-col gap-6">
      {/* Stats */}
      <div className="flex flex-wrap gap-4">
        {["admin", "editor", "usuari"].map((rol) => (
          <div key={rol} className="bg-white border border-gray-200 px-5 py-3 rounded">
            <p className="text-xs text-gray-400 uppercase tracking-wide mb-0.5 capitalize">{rol}s</p>
            <p className="text-2xl font-bold text-gray-700" style={{ fontFamily: "var(--font-serif)" }}>
              {cargando ? "—" : usuarios.filter((u) => u.rol === rol).length}
            </p>
          </div>
        ))}
      </div>

      {/* Tabla */}
      <div className="bg-white border border-gray-200">
        <div className="px-5 py-4 border-b border-gray-100 flex items-center gap-3">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-gray-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
          </svg>
          <input
            type="text"
            placeholder="Buscar por nombre o email..."
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
                <th className="px-5 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wide w-12"></th>
                <th className="px-5 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wide">Usuario</th>
                <th className="px-5 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wide hidden md:table-cell">Email</th>
                <th className="px-5 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wide">Rol</th>
                <th className="px-5 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wide">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {paginados.map((u) => {
                const avatarUrl = u.foto
                  ? `${BASE_UPLOADS}${u.foto.replace(/^uploads[\\/]/, "")}`
                  : null;
                return (
                  <tr key={u._id} className="hover:bg-gray-50 transition-colors group">
                    <td className="px-5 py-3">
                      {avatarUrl ? (
                        <img src={avatarUrl} alt={u.name} className="w-9 h-9 rounded-full object-cover" />
                      ) : (
                        <div className="w-9 h-9 rounded-full bg-[var(--color-wine)]/10 flex items-center justify-center text-sm font-bold text-[var(--color-wine)]">
                          {u.name?.charAt(0).toUpperCase()}
                        </div>
                      )}
                    </td>
                    <td className="px-5 py-3 font-medium text-gray-800">{u.name}</td>
                    <td className="px-5 py-3 text-gray-400 hidden md:table-cell">{u.email}</td>
                    <td className="px-5 py-3">
                      {editandoRol === u._id ? (
                        <select
                          defaultValue={u.rol}
                          autoFocus
                          onChange={(e) => handleRolChange(u._id, e.target.value)}
                          onBlur={() => setEditandoRol(null)}
                          className="border border-gray-300 rounded px-2 py-1 text-xs focus:outline-none focus:border-[var(--color-wine)]"
                        >
                          {ROLES.map((r) => <option key={r} value={r}>{r}</option>)}
                        </select>
                      ) : (
                        <button
                          onClick={() => setEditandoRol(u._id)}
                          className={`text-xs font-medium px-2.5 py-1 rounded-full capitalize transition-opacity hover:opacity-80 ${rolBadge[u.rol] ?? rolBadge.usuari}`}
                          title="Clic para cambiar rol"
                        >
                          {u.rol}
                        </button>
                      )}
                    </td>
                    <td className="px-5 py-3 text-right">
                      <div className="flex gap-3 justify-end opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => handleDelete(u._id, u.name)}
                          className="text-xs text-red-500 hover:underline font-medium"
                        >
                          Eliminar
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
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
