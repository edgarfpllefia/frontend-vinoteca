import { Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ProtectedRoute from './components/ProtectedRoute'
import Home from './pages/Home'
import Vinos from './pages/Vinos'
import Cervezas from './pages/Cervezas'
import Login from './pages/Login'
import Register from './pages/Register'
import VinoDetalle from './pages/VinoDetalle'
import CervezaDetalle from './pages/CervezaDetalle'
import Carrito from './pages/Carrito'
import Perfil from './pages/Perfil'
import MisPedidos from './pages/MisPedidos'
import SobreNosotros from './pages/SobreNosotros'
import Contacto from './pages/Contacto'
import AdminLayout from './pages/admin/AdminLayout'
import AdminVinos from './pages/admin/AdminVinos'
import AdminVinoForm from './pages/admin/AdminVinoForm'
import AdminCervezas from './pages/admin/AdminCervezas'
import AdminCervezaForm from './pages/admin/AdminCervezaForm'
import AdminUsuarios from './pages/admin/AdminUsuarios'

const NO_FOOTER = ['/login', '/register']

function App() {
  const location = useLocation()
  const isAdmin = location.pathname.startsWith('/admin')
  const showFooter = !NO_FOOTER.includes(location.pathname) && !isAdmin
  const showNavbar = !isAdmin

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: 'var(--color-cream)' }}>
      {showNavbar && <Navbar />}
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/vinos" element={<Vinos />} />
          <Route path="/cervezas" element={<Cervezas />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/vinos/:id" element={<VinoDetalle />} />
          <Route path="/cervezas/:id" element={<CervezaDetalle />} />
          <Route path="/sobre-nosotros" element={<SobreNosotros />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route
            path="/carrito"
            element={
              <ProtectedRoute>
                <Carrito />
              </ProtectedRoute>
            }
          />
          <Route
            path="/perfil"
            element={
              <ProtectedRoute>
                <Perfil />
              </ProtectedRoute>
            }
          />
          <Route
            path="/mis-pedidos"
            element={
              <ProtectedRoute>
                <MisPedidos />
              </ProtectedRoute>
            }
          />
          <Route path="/admin" element={<AdminLayout />}>
            <Route path="vinos" element={<AdminVinos />} />
            <Route path="vinos/nuevo" element={<AdminVinoForm />} />
            <Route path="vinos/:id/editar" element={<AdminVinoForm />} />
            <Route path="cervezas" element={<AdminCervezas />} />
            <Route path="cervezas/nuevo" element={<AdminCervezaForm />} />
            <Route path="cervezas/:id/editar" element={<AdminCervezaForm />} />
            <Route path="usuarios" element={<AdminUsuarios />} />
          </Route>
        </Routes>
      </main>
      {showFooter && <Footer />}
    </div>
  )
}

export default App
