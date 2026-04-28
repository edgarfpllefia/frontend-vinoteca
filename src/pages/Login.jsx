import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { login } from "../services/authService";
import { useAuth } from "../context/AuthContext";

const BG = "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=1200&q=80";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [cargando, setCargando] = useState(false);
  const { iniciarSesion } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setCargando(true);
    try {
      const data = await login(email, password);
      iniciarSesion(data);
      navigate("/");
    } catch (err) {
      setError(err.message);
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="grid md:grid-cols-2" style={{ height: 'calc(100vh - 64px)' }}>
      {/* Panel izquierdo — imagen */}
      <div
        className="hidden md:block relative"
        style={{ backgroundImage: `url(${BG})`, backgroundSize: "cover", backgroundPosition: "center" }}
      >
        <div className="absolute inset-0 bg-[var(--color-wine)]/70" />
        <div className="absolute inset-0 flex flex-col justify-end p-12">
          <blockquote className="text-white">
            <p className="text-2xl font-semibold leading-snug mb-4" style={{ fontFamily: "var(--font-serif)" }}>
              "El vino es la poesía de la tierra."
            </p>
            <footer className="text-white/50 text-sm">— Mario Soldati</footer>
          </blockquote>
        </div>
      </div>

      {/* Panel derecho — formulario */}
      <div className="flex items-center justify-center px-8 py-16 bg-[var(--color-cream)]">
        <div className="w-full max-w-sm">
          {/* Logo móvil */}
          <div className="flex items-center gap-2 mb-10 md:hidden" style={{ fontFamily: "var(--font-serif)" }}>
            <span className="text-[var(--color-gold)]">✦</span>
            <span className="text-[var(--color-wine)] text-lg font-semibold">Vinoteca</span>
          </div>

          <p className="text-xs tracking-[0.3em] uppercase text-[var(--color-gold)] mb-2">Bienvenido</p>
          <h1
            className="text-3xl font-bold text-[var(--color-wine)] mb-8"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            Acceder
          </h1>

          {error && (
            <div className="border-l-2 border-red-400 bg-red-50 px-4 py-3 mb-6">
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div>
              <label className="block text-xs tracking-widest uppercase text-[var(--color-text-muted)] mb-2">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="tu@email.com"
                className="w-full bg-white border border-[var(--color-cream-dark)] px-4 py-3 text-sm focus:outline-none focus:border-[var(--color-wine)] transition"
              />
            </div>
            <div>
              <label className="block text-xs tracking-widest uppercase text-[var(--color-text-muted)] mb-2">
                Contraseña
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="••••••••"
                className="w-full bg-white border border-[var(--color-cream-dark)] px-4 py-3 text-sm focus:outline-none focus:border-[var(--color-wine)] transition"
              />
            </div>

            <button
              type="submit"
              disabled={cargando}
              className="w-full bg-[var(--color-wine)] hover:bg-[var(--color-wine-light)] text-white text-xs tracking-widest uppercase py-3.5 transition disabled:opacity-50 mt-1"
            >
              {cargando ? "Entrando..." : "Entrar"}
            </button>
          </form>

          <p className="text-sm text-[var(--color-text-muted)] mt-8 text-center">
            ¿No tienes cuenta?{" "}
            <Link to="/register" className="text-[var(--color-wine)] hover:underline font-medium">
              Regístrate
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
