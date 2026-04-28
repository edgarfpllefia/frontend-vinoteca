import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { registro } from "../services/authService";
import { useAuth } from "../context/AuthContext";

const BG = "https://images.unsplash.com/photo-1474722883778-792e7990302f?auto=format&fit=crop&w=1200&q=80";

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [foto, setFoto] = useState(null);
  const [preview, setPreview] = useState(null);
  const [error, setError] = useState(null);
  const [cargando, setCargando] = useState(false);
  const { iniciarSesion } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleFoto = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setFoto(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    if (!foto) { setError("La foto de perfil es obligatoria"); return; }
    setCargando(true);
    try {
      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("email", form.email);
      formData.append("password", form.password);
      formData.append("foto", foto);
      const data = await registro(formData);
      iniciarSesion(data);
      navigate("/");
    } catch (err) {
      setError(err.message);
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="grid md:grid-cols-2 overflow-hidden" style={{ height: 'calc(100vh - 64px)' }}>
      {/* Panel izquierdo — imagen */}
      <div
        className="hidden md:block relative"
        style={{ backgroundImage: `url(${BG})`, backgroundSize: "cover", backgroundPosition: "center" }}
      >
        <div className="absolute inset-0 bg-[var(--color-wine)]/70" />
        <div className="absolute inset-0 flex flex-col justify-end p-12">
          <div className="text-white">
            <p className="text-xs tracking-[0.3em] uppercase text-[var(--color-gold)] mb-3">Únete a nosotros</p>
            <p className="text-2xl font-semibold leading-snug" style={{ fontFamily: "var(--font-serif)" }}>
              Accede a nuestra selección exclusiva y gestiona tus pedidos.
            </p>
          </div>
        </div>
      </div>

      {/* Panel derecho — formulario */}
      <div className="flex items-center justify-center px-8 py-14 bg-[var(--color-cream)] overflow-y-auto">
        <div className="w-full max-w-sm">
          {/* Logo móvil */}
          <div className="flex items-center gap-2 mb-8 md:hidden" style={{ fontFamily: "var(--font-serif)" }}>
            <span className="text-[var(--color-gold)]">✦</span>
            <span className="text-[var(--color-wine)] text-lg font-semibold">Vinoteca</span>
          </div>

          <p className="text-xs tracking-[0.3em] uppercase text-[var(--color-gold)] mb-2">Nueva cuenta</p>
          <h1
            className="text-3xl font-bold text-[var(--color-wine)] mb-8"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            Registrarse
          </h1>

          {error && (
            <div className="border-l-2 border-red-400 bg-red-50 px-4 py-3 mb-6">
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            {/* Avatar preview + upload */}
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-[var(--color-cream-dark)] border border-[var(--color-cream-dark)] overflow-hidden shrink-0 flex items-center justify-center">
                {preview ? (
                  <img src={preview} alt="preview" className="w-full h-full object-cover" />
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-[var(--color-text-muted)] opacity-40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                  </svg>
                )}
              </div>
              <label className="cursor-pointer flex flex-col gap-0.5">
                <span className="text-xs tracking-widest uppercase text-[var(--color-text-muted)]">Foto de perfil *</span>
                <span className="text-xs text-[var(--color-wine)] hover:underline">
                  {foto ? foto.name : "Seleccionar imagen"}
                </span>
                <input type="file" accept="image/*" onChange={handleFoto} className="hidden" />
              </label>
            </div>

            <div>
              <label className="block text-xs tracking-widest uppercase text-[var(--color-text-muted)] mb-2">Nombre</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                placeholder="Tu nombre"
                className="w-full bg-white border border-[var(--color-cream-dark)] px-4 py-3 text-sm focus:outline-none focus:border-[var(--color-wine)] transition"
              />
            </div>
            <div>
              <label className="block text-xs tracking-widest uppercase text-[var(--color-text-muted)] mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                placeholder="tu@email.com"
                className="w-full bg-white border border-[var(--color-cream-dark)] px-4 py-3 text-sm focus:outline-none focus:border-[var(--color-wine)] transition"
              />
            </div>
            <div>
              <label className="block text-xs tracking-widest uppercase text-[var(--color-text-muted)] mb-2">Contraseña</label>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                required
                placeholder="Mínimo 6 caracteres"
                className="w-full bg-white border border-[var(--color-cream-dark)] px-4 py-3 text-sm focus:outline-none focus:border-[var(--color-wine)] transition"
              />
            </div>

            <button
              type="submit"
              disabled={cargando}
              className="w-full bg-[var(--color-wine)] hover:bg-[var(--color-wine-light)] text-white text-xs tracking-widest uppercase py-3.5 transition disabled:opacity-50 mt-1"
            >
              {cargando ? "Registrando..." : "Crear cuenta"}
            </button>
          </form>

          <p className="text-sm text-[var(--color-text-muted)] mt-8 text-center">
            ¿Ya tienes cuenta?{" "}
            <Link to="/login" className="text-[var(--color-wine)] hover:underline font-medium">
              Inicia sesión
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
