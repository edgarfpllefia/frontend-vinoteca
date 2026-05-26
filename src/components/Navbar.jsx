import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { getImageUrl } from "../config";

export default function Navbar() {
  const { usuario, cerrarSesion, esEditor } = useAuth();
  const { total } = useCart();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    cerrarSesion();
    navigate("/login");
  };

  const avatarUrl = getImageUrl(usuario?.foto);

  const navLinkClass = ({ isActive }) =>
    `text-sm tracking-wide transition-colors duration-200 ${
      isActive
        ? "text-[var(--color-gold)]"
        : "text-[var(--color-cream-dark)] hover:text-white"
    }`;

  return (
    <header className="bg-[var(--color-wine)] shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 text-white" style={{ fontFamily: "var(--font-serif)" }}>
          <span className="text-[var(--color-gold)] text-xl">✦</span>
          <span className="text-lg font-semibold tracking-wide">Vinoteca</span>
        </Link>

        {/* Nav central */}
        <nav className="hidden md:flex items-center gap-8">
          <NavLink to="/" end className={navLinkClass}>Inicio</NavLink>
          <NavLink to="/vinos" className={navLinkClass}>Vinos</NavLink>
          <NavLink to="/cervezas" className={navLinkClass}>Cervezas</NavLink>
          <NavLink to="/sobre-nosotros" className={navLinkClass}>Nosotros</NavLink>
          <NavLink to="/contacto" className={navLinkClass}>Contacto</NavLink>
          {esEditor && (
            <NavLink to="/admin/vinos" className={navLinkClass}>Admin</NavLink>
          )}
        </nav>

        {/* Derecha */}
        <div className="hidden md:flex items-center gap-5">
          {usuario ? (
            <>
              <Link to="/carrito" className="relative text-[var(--color-cream-dark)] hover:text-white transition">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.836l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                </svg>
                {total > 0 && (
                  <span className="absolute -top-2 -right-2 bg-[var(--color-gold)] text-[var(--color-wine)] text-xs font-bold rounded-full w-4 h-4 flex items-center justify-center leading-none">
                    {total}
                  </span>
                )}
              </Link>

              <Link to="/perfil" className="flex items-center gap-2 group">
                {avatarUrl ? (
                  <img src={avatarUrl} alt={usuario.name}
                    className="w-8 h-8 rounded-full object-cover border-2 border-[var(--color-gold)] opacity-90 group-hover:opacity-100 transition" />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-[var(--color-wine-light)] border-2 border-[var(--color-gold)] flex items-center justify-center text-xs font-bold text-white">
                    {usuario.name?.charAt(0).toUpperCase()}
                  </div>
                )}
                <span className="text-sm text-[var(--color-cream-dark)] group-hover:text-white transition hidden lg:block">
                  {usuario.name}
                </span>
              </Link>

              <button onClick={handleLogout}
                className="text-xs tracking-widest uppercase text-[var(--color-cream-dark)] hover:text-white border border-[var(--color-wine-light)] hover:border-white px-3 py-1.5 rounded transition">
                Salir
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-sm text-[var(--color-cream-dark)] hover:text-white transition">Acceder</Link>
              <Link to="/register"
                className="text-sm bg-[var(--color-gold)] hover:bg-[var(--color-gold-light)] text-[var(--color-wine)] font-semibold px-4 py-1.5 rounded transition">
                Registrarse
              </Link>
            </>
          )}
        </div>

        {/* Hamburguesa móvil */}
        <button className="md:hidden text-white" onClick={() => setMenuOpen(!menuOpen)}>
          <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {menuOpen
              ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
              : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
            }
          </svg>
        </button>
      </div>

      {/* Menú móvil */}
      {menuOpen && (
        <div className="md:hidden bg-[var(--color-wine-light)] px-6 py-4 flex flex-col gap-4 text-sm">
          <NavLink to="/" end className={navLinkClass} onClick={() => setMenuOpen(false)}>Inicio</NavLink>
          <NavLink to="/vinos" className={navLinkClass} onClick={() => setMenuOpen(false)}>Vinos</NavLink>
          <NavLink to="/cervezas" className={navLinkClass} onClick={() => setMenuOpen(false)}>Cervezas</NavLink>
          <NavLink to="/sobre-nosotros" className={navLinkClass} onClick={() => setMenuOpen(false)}>Nosotros</NavLink>
          <NavLink to="/contacto" className={navLinkClass} onClick={() => setMenuOpen(false)}>Contacto</NavLink>
          {esEditor && <NavLink to="/admin/vinos" className={navLinkClass} onClick={() => setMenuOpen(false)}>Admin</NavLink>}
          {usuario ? (
            <button onClick={handleLogout} className="text-left text-[var(--color-cream-dark)]">Salir</button>
          ) : (
            <>
              <NavLink to="/login" className={navLinkClass} onClick={() => setMenuOpen(false)}>Acceder</NavLink>
              <NavLink to="/register" className={navLinkClass} onClick={() => setMenuOpen(false)}>Registrarse</NavLink>
            </>
          )}
        </div>
      )}
    </header>
  );
}
