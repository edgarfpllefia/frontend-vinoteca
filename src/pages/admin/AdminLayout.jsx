import { NavLink, Outlet, Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const sideLinks = (esAdmin) => [
  {
    to: "/admin/vinos",
    label: "Vinos",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714a2.25 2.25 0 001.357 2.059l.096.04A2.25 2.25 0 0117 13.058V3.186m-7.25-.082A24.323 24.323 0 0112 3c.998 0 1.979.057 2.943.163M12 20.25a8.25 8.25 0 008.25-8.25H3.75A8.25 8.25 0 0012 20.25z" />
      </svg>
    ),
  },
  {
    to: "/admin/cervezas",
    label: "Cervezas",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 10.5v9a1.5 1.5 0 001.5 1.5h9A1.5 1.5 0 0015 19.5v-9M3 10.5h12M3 10.5L4.5 4.5h9l1.5 6M16.5 10.5h1.125A2.625 2.625 0 0120.25 13.125v1.5a2.625 2.625 0 01-2.625 2.625H16.5" />
      </svg>
    ),
  },
  ...(esAdmin
    ? [
        {
          to: "/admin/usuarios",
          label: "Usuarios",
          icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
            </svg>
          ),
        },
      ]
    : []),
];

export default function AdminLayout() {
  const { esAdmin, esEditor, usuario } = useAuth();
  const location = useLocation();

  if (!esEditor) return <Navigate to="/" replace />;

  const links = sideLinks(esAdmin);
  const currentSection = links.find((l) => location.pathname.startsWith(l.to))?.label ?? "Panel";

  return (
    <div className="h-screen flex overflow-hidden" style={{ backgroundColor: "#f4f5f7" }}>
      {/* Sidebar */}
      <aside className="w-56 shrink-0 bg-[var(--color-wine)] flex flex-col">
        <div className="px-6 py-6 border-b border-white/10">
          <p className="text-[var(--color-gold)] text-xs tracking-widest uppercase mb-1">Panel</p>
          <p className="text-white font-semibold text-sm" style={{ fontFamily: "var(--font-serif)" }}>
            Administración
          </p>
        </div>

        <nav className="flex-1 px-3 py-4 flex flex-col gap-1">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded text-sm transition-colors ${
                  isActive
                    ? "bg-white/15 text-white font-medium"
                    : "text-white/60 hover:text-white hover:bg-white/10"
                }`
              }
            >
              {link.icon}
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="px-5 py-5 border-t border-white/10">
          <p className="text-white/40 text-xs truncate">{usuario?.name}</p>
          <span className="text-[var(--color-gold)] text-xs capitalize">{usuario?.rol}</span>
        </div>
      </aside>

      {/* Contenido */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="bg-white border-b border-gray-200 px-8 py-4 flex items-center justify-between">
          <h1 className="text-base font-semibold text-gray-800" style={{ fontFamily: "var(--font-serif)" }}>
            {currentSection}
          </h1>
          <NavLink
            to="/"
            className="text-xs text-gray-400 hover:text-gray-700 transition flex items-center gap-1.5"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            Volver a la web
          </NavLink>
        </header>

        <main className="flex-1 px-8 py-8 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
