import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { updatePerfil } from "../services/authService";
import { getImageUrl } from "../config";

export default function Perfil() {
  const { usuario, iniciarSesion } = useAuth();
  const [form, setForm] = useState({ name: usuario?.name || "", password: "" });
  const [foto, setFoto] = useState(null);
  const [preview, setPreview] = useState(null);
  const [guardando, setGuardando] = useState(false);
  const [exito, setExito] = useState(false);
  const [error, setError] = useState(null);

  const avatarUrl = preview || getImageUrl(usuario?.foto);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setExito(false);
    setError(null);
  };

  const handleFoto = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setFoto(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setExito(false);
    setGuardando(true);

    try {
      const formData = new FormData();
      if (form.name && form.name !== usuario.name) formData.append("name", form.name);
      if (form.password) formData.append("password", form.password);
      if (foto) formData.append("foto", foto);

      if ([...formData.keys()].length === 0) {
        setError("No has cambiado ningún dato.");
        setGuardando(false);
        return;
      }

      const data = await updatePerfil(formData);
      iniciarSesion(data);
      setForm({ name: data.usuari?.name || form.name, password: "" });
      setFoto(null);
      setPreview(null);
      setExito(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setGuardando(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-[var(--color-wine)] mb-8" style={{ fontFamily: "var(--font-serif)" }}>
        Mi perfil
      </h1>

      <div className="bg-white border border-[var(--color-cream-dark)] p-8 flex flex-col gap-6">

        {/* Avatar */}
        <div className="flex items-center gap-4">
          <label className="cursor-pointer group relative">
            {avatarUrl ? (
              <img src={avatarUrl} alt={usuario?.name}
                className="w-20 h-20 rounded-full object-cover border-4 border-[var(--color-cream-dark)] group-hover:opacity-80 transition" />
            ) : (
              <div className="w-20 h-20 rounded-full bg-[var(--color-wine)]/10 flex items-center justify-center text-3xl font-bold text-[var(--color-wine)] group-hover:opacity-80 transition">
                {usuario?.name?.charAt(0).toUpperCase()}
              </div>
            )}
            <div className="absolute inset-0 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
              <span className="text-xs text-white bg-black/50 rounded-full px-2 py-1">Cambiar</span>
            </div>
            <input type="file" accept="image/*" onChange={handleFoto} className="hidden" />
          </label>
          <div>
            <p className="text-xl font-bold text-[var(--color-wine)]" style={{ fontFamily: "var(--font-serif)" }}>{usuario?.name}</p>
            <p className="text-xs text-[var(--color-text-muted)]">{usuario?.email}</p>
            <span className="text-xs bg-[var(--color-wine)]/10 text-[var(--color-wine)] font-medium px-2 py-0.5 rounded-full capitalize">{usuario?.rol}</span>
          </div>
        </div>

        {foto && (
          <p className="text-xs text-[var(--color-text-muted)] -mt-2">
            Nueva foto seleccionada: <span className="text-[var(--color-wine)]">{foto.name}</span>
          </p>
        )}

        {/* Enlace a pedidos */}
        <Link to="/mis-pedidos"
          className="flex items-center justify-between border border-[var(--color-cream-dark)] px-4 py-3 hover:border-[var(--color-wine)] transition group">
          <span className="text-sm text-[var(--color-text-muted)] group-hover:text-[var(--color-wine)] transition">Ver mis pedidos</span>
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-[var(--color-text-muted)] group-hover:text-[var(--color-wine)] transition" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
        </Link>

        <hr className="border-[var(--color-cream-dark)]" />

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {exito && <p className="bg-green-50 border border-green-200 text-green-700 px-4 py-2 text-sm">Perfil actualizado correctamente.</p>}
          {error && <p className="bg-red-50 border border-red-200 text-red-600 px-4 py-2 text-sm">{error}</p>}

          <div>
            <label className="block text-xs tracking-widest uppercase text-[var(--color-text-muted)] mb-1">Nombre</label>
            <input type="text" name="name" value={form.name} onChange={handleChange}
              className="w-full border border-[var(--color-cream-dark)] px-3 py-2 text-sm focus:outline-none focus:border-[var(--color-wine)] transition" />
          </div>

          <div>
            <label className="block text-xs tracking-widest uppercase text-[var(--color-text-muted)] mb-1">
              Nueva contraseña <span className="font-normal normal-case">(dejar vacío para no cambiar)</span>
            </label>
            <input type="password" name="password" value={form.password} onChange={handleChange} placeholder="••••••••"
              className="w-full border border-[var(--color-cream-dark)] px-3 py-2 text-sm focus:outline-none focus:border-[var(--color-wine)] transition" />
          </div>

          <button type="submit" disabled={guardando}
            className="bg-[var(--color-wine)] hover:bg-[var(--color-wine-light)] text-white text-xs tracking-widest uppercase py-3 transition disabled:opacity-50">
            {guardando ? "Guardando..." : "Guardar cambios"}
          </button>
        </form>
      </div>
    </div>
  );
}
