import { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext";

const CartContext = createContext(null);

const cartKey = (id) => `cart_${id}`;

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  const { usuario } = useAuth();

  // Cargar carrito del usuario cuando inicia sesión
  useEffect(() => {
    if (usuario) {
      const guardado = localStorage.getItem(cartKey(usuario.id));
      setItems(guardado ? JSON.parse(guardado) : []);
    } else {
      setItems([]);
    }
  }, [usuario]);

  // Persistir carrito en localStorage cada vez que cambia
  useEffect(() => {
    if (usuario) {
      localStorage.setItem(cartKey(usuario.id), JSON.stringify(items));
    }
  }, [items, usuario]);

  const añadir = (producto, tipo) => {
    setItems((prev) => {
      const existe = prev.find((i) => i.producto._id === producto._id);
      if (existe) {
        return prev.map((i) =>
          i.producto._id === producto._id
            ? { ...i, cantidad: i.cantidad + 1 }
            : i
        );
      }
      return [...prev, { producto, cantidad: 1, tipo }];
    });
  };

  const quitar = (id) => setItems((prev) => prev.filter((i) => i.producto._id !== id));

  const cambiarCantidad = (id, cantidad) => {
    if (cantidad < 1) return quitar(id);
    setItems((prev) =>
      prev.map((i) => (i.producto._id === id ? { ...i, cantidad } : i))
    );
  };

  const vaciar = () => setItems([]);

  const total = items.reduce((acc, i) => acc + i.cantidad, 0);

  const paraApi = () => ({
    vinos: items
      .filter((i) => i.tipo === "vino")
      .map((i) => ({ producto: i.producto._id, cantidad: i.cantidad })),
    cervezas: items
      .filter((i) => i.tipo === "cerveza")
      .map((i) => ({ producto: i.producto._id, cantidad: i.cantidad })),
  });

  return (
    <CartContext.Provider value={{ items, añadir, quitar, cambiarCantidad, vaciar, total, paraApi }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
