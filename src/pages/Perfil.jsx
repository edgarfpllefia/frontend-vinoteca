import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { updatePerfil } from "../services/authService";
import { BASE_UPLOADS } from "../config";

export default function Perfil() {
  const { usuario, iniciarSesion } = useAuth();
  const [form, setForm] = useState({ email: usuario?.email || "", password: "" });
  const [guardando, setGuardando] = useState(false);
  const [exito, setExito] = useState(false);
  const [error, setError] = useState(null);

  const avatarUrl = usuario?.foto
    ? `${BASE_UPLOADS}${usuario.foto.replace(/^uploads[\\/]/, "")}`
    : null;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setExito(false);
    setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setExito(false);
    setGuardando(true);

    const cambios = {};
    if (form.email && form.email !== usuario.email) cambios.email = form.email;
    if (form.password) cambios.password = form.password;

    if (Object.keys(cambios).length === 0) {
      setError("No has cambiado ningún dato.");
      setGuardando(false);
      return;
    }

    try {
      const data = await updatePerfil(cambios);
      iniciarSesion(data);
      setForm({ email: data.usuari?.email || form.email, password: "" });
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

        {/* Avatar y nombre */}
        <div className="flex items-center gap-4">
          {avatarUrl ? (
            <img
              src={avatarUrl}
              alt={usuario?.name}
              className="w-20 h-20 rounded-full object-cover border-4 border-[var(--color-cream-dark)]"
            />
          ) : (
            <div className="w-20 h-20 rounded-full bg-[var(--color-wine)]/10 flex items-center justify-center text-3xl font-bold text-[var(--color-wine)]">
              {usuario?.name?.charAt(0).toUpperCase()}
            </div>
          )}
          <div>
            <p className="text-xl font-bold text-[var(--color-wine)]" style={{ fontFamily: "var(--font-serif)" }}>
              {usuario?.name}
            </p>
            <span className="text-xs bg-[var(--color-wine)]/10 text-[var(--color-wine)] font-medium px-2 py-0.5 rounded-full capitalize">
              {usuario?.rol}
            </span>
          </div>
        </div>

        {/* Enlace a pedidos */}
        <Link
          to="/mis-pedidos"
          className="flex items-center justify-between border border-[var(--color-cream-dark)] px-4 py-3 hover:border-[var(--color-wine)] transition group"
        >
          <span className="text-sm text-[var(--color-text-muted)] group-hover:text-[var(--color-wine)] transition">
            Ver mis pedidos
          </span>
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-[var(--color-text-muted)] group-hover:text-[var(--color-wine)] transition" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
        </Link>

        <hr className="border-[var(--color-cream-dark)]" />

        {/* Formulario edición */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {exito && (
            <p className="bg-green-50 border border-green-200 text-green-700 px-4 py-2 text-sm">
              Perfil actualizado correctamente.
            </p>
          )}
          {error && (
            <p className="bg-red-50 border border-red-200 text-red-600 px-4 py-2 text-sm">
              {error}
            </p>
          )}

          <div>
            <label className="block text-xs tracking-widest uppercase text-[var(--color-text-muted)] mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full border border-[var(--color-cream-dark)] px-3 py-2 text-sm focus:outline-none focus:border-[var(--color-wine)] transition"
            />
          </div>

          <div>
            <label className="block text-xs tracking-widest uppercase text-[var(--color-text-muted)] mb-1">
              Nueva contraseña{" "}
              <span className="text-[var(--color-text-muted)] font-normal normal-case">(dejar vacío para no cambiar)</span>
            </label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="••••••••"
              className="w-full border border-[var(--color-cream-dark)] px-3 py-2 text-sm focus:outline-none focus:border-[var(--color-wine)] transition"
            />
          </div>

          <button
            type="submit"
            disabled={guardando}
            className="bg-[var(--color-wine)] hover:bg-[var(--color-wine-light)] text-white text-xs tracking-widest uppercase py-3 transition disabled:opacity-50"
          >
            {guardando ? "Guardando..." : "Guardar cambios"}
          </button>
        </form>
      </div>
    </div>
  );
}
