# Vinoteca — Frontend

Aplicación React + Vite para la tienda online de vinos y cervezas.

## Instalación

```bash
npm install
```

## Variables de entorno

Crea un archivo `.env` en la raíz con:

```env
VITE_API_URL=http://localhost:3001
```

En producción, cambia la URL por la del backend desplegado.

## Ejecución

```bash
# Desarrollo
npm run dev

# Build de producción
npm run build
```

## Estructura

```
src/
├── components/   # Navbar, Footer, ProductCard, ProtectedRoute, Paginacion
├── context/      # AuthContext (sesión) y CartContext (carrito)
├── hooks/        # usePaginacion
├── pages/        # Vistas públicas y de usuario
│   └── admin/    # Dashboard admin/editor
└── services/     # Llamadas a la API
```

## Funcionalidades

- Catálogo público de vinos y cervezas con detalle
- Registro con foto de perfil (multipart/form-data)
- Login con persistencia de sesión (JWT en localStorage)
- Carrito de compra con gestión de cantidades
- Creación de pedidos con confirmación por email
- Historial de pedidos del usuario (`/mis-pedidos`)
- Edición de perfil (email y contraseña)
- Dashboard admin/editor: CRUD completo de productos
- Dashboard admin: gestión de usuarios y cambio de roles
- Rutas protegidas por rol (usuari / editor / admin)
