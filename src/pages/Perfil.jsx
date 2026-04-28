import { useState } from "react";
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
      <h1 className="text-3xl font-bold text-purple-900 mb-8">Mi perfil</h1>

      <div className="bg-white rounded-2xl shadow-md p-8 flex flex-col gap-6">

        {/* Avatar y nombre */}
        <div className="flex items-center gap-4">
          {avatarUrl ? (
            <img
              src={avatarUrl}
              alt={usuario?.name}
              className="w-20 h-20 rounded-full object-cover border-4 border-purple-200"
            />
          ) : (
            <div className="w-20 h-20 rounded-full bg-purple-200 flex items-center justify-center text-3xl font-bold text-purple-700">
              {usuario?.name?.charAt(0).toUpperCase()}
            </div>
          )}
          <div>
            <p className="text-xl font-bold text-purple-900">{usuario?.name}</p>
            <span className="text-xs bg-purple-100 text-purple-700 font-medium px-2 py-0.5 rounded-full capitalize">
              {usuario?.rol}
            </span>
          </div>
        </div>

        <hr className="border-gray-200" />

        {/* Formulario edición */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {exito && (
            <p className="bg-green-50 border border-green-200 text-green-700 rounded-lg px-4 py-2 text-sm">
              Perfil actualizado correctamente.
            </p>
          )}
          {error && (
            <p className="bg-red-50 border border-red-200 text-red-600 rounded-lg px-4 py-2 text-sm">
              {error}
            </p>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nueva contraseña{" "}
              <span className="text-gray-400 font-normal">(dejar vacío para no cambiar)</span>
            </label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="••••••••"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <button
            type="submit"
            disabled={guardando}
            className="bg-purple-700 hover:bg-purple-800 text-white font-semibold rounded-lg py-2 transition disabled:opacity-50"
          >
            {guardando ? "Guardando..." : "Guardar cambios"}
          </button>
        </form>
      </div>
    </div>
  );
}
