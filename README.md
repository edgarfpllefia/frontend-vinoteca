# Vinoteca — Frontend (IA3 - Projecte API)

Aplicació React + Vite per a VINACOTECA. Frontend de la botiga online de vins i cerveses.

## URLs desplegades

- **Frontend**: https://frontend-vinoteca.vercel.app
- **Backend**: https://tu-backend.onrender.com

## Stack

- React + Vite
- React Router DOM
- Tailwind CSS
- Context API (AuthContext, CartContext)

## Instal·lació

```bash
npm install
```

## Variables d'entorn

Crea un fitxer `.env` a l'arrel amb:

```env
VITE_API_URL=http://localhost:3001
```

En producció, canvia la URL pel backend desplegat.

## Execució

```bash
# Desenvolupament
npm run dev

# Build de producció
npm run build
```

## Credencials de prova

Registra't des del formulari `/register` amb qualsevol email i foto. Per obtenir rol `editor` o `admin`, modifica el camp `rol` directament a MongoDB Atlas.

## Funcionalitats

### Zona pública
- Catàleg de vins i cerveses amb paginació
- Detall de producte amb fitxa tècnica
- Pàgines "Sobre nosotros" i "Contacte"

### Zona d'usuari autenticat
- Registre amb foto de perfil (multipart/form-data)
- Login amb persistència de sessió (JWT en localStorage)
- Carret de compra amb gestió de quantitats
- Creació de comandes amb confirmació visual i notificació per correu
- Historial de comandes pròpies (`/mis-pedidos`)
- Edició de perfil (nom, foto i contrasenya)
- Logout

### Dashboard editor (`/admin`)
- CRUD complet de vins i cerveses
- Pujada d'imatges via Cloudinary
- Buscador i paginació

### Dashboard admin (`/admin/usuarios`)
- Llistat d'usuaris amb buscador
- Canvi de rol en un clic
- Eliminació d'usuaris

### Seguretat frontend
- Rutes protegides per rol (`ProtectedRoute`, `AdminLayout`)
- Gestió d'errors 401/403 amb missatge clar
- Sidebar admin adaptatiu per a mòbil (menú hamburguesa)

## Estructura

```
src/
├── components/
│   ├── Navbar.jsx
│   ├── Footer.jsx
│   ├── ProductCard.jsx
│   ├── ProtectedRoute.jsx
│   └── Paginacion.jsx
├── context/
│   ├── AuthContext.jsx    # Sessió i rol
│   └── CartContext.jsx    # Carret de compra
├── hooks/
│   └── usePaginacion.js
├── pages/
│   ├── Home.jsx
│   ├── Vinos.jsx
│   ├── VinoDetalle.jsx
│   ├── Cervezas.jsx
│   ├── CervezaDetalle.jsx
│   ├── Login.jsx
│   ├── Register.jsx
│   ├── Perfil.jsx
│   ├── MisPedidos.jsx
│   ├── Carrito.jsx
│   ├── SobreNosotros.jsx
│   ├── Contacto.jsx
│   └── admin/
│       ├── AdminLayout.jsx
│       ├── AdminVinos.jsx
│       ├── AdminVinoForm.jsx
│       ├── AdminCervezas.jsx
│       ├── AdminCervezaForm.jsx
│       └── AdminUsuarios.jsx
├── services/
│   ├── api.js             # apiFetch centralitzat
│   ├── authService.js
│   ├── vinosService.js
│   ├── cervezasService.js
│   ├── pedidosService.js
│   └── usuariosService.js
└── config.js              # BASE_URL i getImageUrl (Cloudinary)
```

## Notes sobre imatges

Les imatges es gestionen via **Cloudinary**. La funció `getImageUrl()` de `config.js` és compatible amb URLs de Cloudinary (noves) i rutes relatives antigues (`uploads/...`), per garantir retrocompatibilitat.
