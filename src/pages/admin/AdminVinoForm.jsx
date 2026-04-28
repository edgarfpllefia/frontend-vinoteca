import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getVinoById, createVino, updateVino, updateVinoImatge } from "../../services/vinosService";

export default function AdminVinoForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const esEdicion = Boolean(id);

  const [form, setForm] = useState({ nom: "", tipus: "", graduacio: "", preu: "", descripcio: "" });
  const [imagen, setImagen] = useState(null);
  const [cargando, setCargando] = useState(esEdicion);
  const [guardando, setGuardando] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!esEdicion) return;
    getVinoById(id)
      .then((v) => setForm({ nom: v.nom, tipus: v.tipus, graduacio: v.graduacio, preu: v.preu ?? "", descripcio: v.descripcio || "" }))
      .catch((e) => setError(e.message))
      .finally(() => setCargando(false));
  }, [id]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setGuardando(true);
    try {
      if (esEdicion) {
        await updateVino(id, form);
        if (imagen) {
          const fd = new FormData();
          fd.append("imatge", imagen);
          await updateVinoImatge(id, fd);
        }
      } else {
        const fd = new FormData();
        Object.entries(form).forEach(([k, v]) => fd.append(k, v));
        if (imagen) fd.append("imatge", imagen);
        await createVino(fd);
      }
      navigate("/admin/vinos");
    } catch (e) {
      setError(e.message);
    } finally {
      setGuardando(false);
    }
  };

  if (cargando) return <p className="text-gray-500">Cargando...</p>;

  return (
    <div className="max-w-xl">
      <h2 className="text-xl font-bold text-purple-900 mb-6">
        {esEdicion ? "Editar vino" : "Nuevo vino"}
      </h2>

      {error && (
        <p className="bg-red-50 border border-red-200 text-red-600 rounded-lg px-4 py-2 mb-4 text-sm">{error}</p>
      )}

      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm p-6 flex flex-col gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
          <input name="nom" value={form.nom} onChange={handleChange} required
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Tipo</label>
          <input name="tipus" value={form.tipus} onChange={handleChange} required
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Graduación (%)</label>
          <input name="graduacio" type="number" step="0.1" value={form.graduacio} onChange={handleChange} required
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Precio (€)</label>
          <input name="preu" type="number" step="0.01" min="0" value={form.preu} onChange={handleChange} required
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
          <textarea name="descripcio" value={form.descripcio} onChange={handleChange} rows={3}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Imagen {esEdicion && <span className="text-gray-400 font-normal">(dejar vacío para no cambiar)</span>}
          </label>
          <input type="file" accept="image/*" onChange={(e) => setImagen(e.target.files[0])}
            className="w-full text-sm text-gray-500 file:mr-3 file:py-1 file:px-3 file:rounded-lg file:border-0 file:bg-purple-100 file:text-purple-700 hover:file:bg-purple-200" />
        </div>

        <div className="flex gap-3 pt-2">
          <button type="button" onClick={() => navigate("/admin/vinos")}
            className="flex-1 border border-gray-300 text-gray-600 rounded-lg py-2 text-sm hover:bg-gray-50 transition">
            Cancelar
          </button>
          <button type="submit" disabled={guardando}
            className="flex-1 bg-purple-700 hover:bg-purple-800 text-white font-semibold rounded-lg py-2 text-sm transition disabled:opacity-50">
            {guardando ? "Guardando..." : "Guardar"}
          </button>
        </div>
      </form>
    </div>
  );
}
