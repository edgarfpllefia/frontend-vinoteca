import { apiFetch } from "./api";

export const crearPedido = (vinos, cervezas) =>
  apiFetch("/pedidos", {
    method: "POST",
    body: JSON.stringify({ vinos, cervezas }),
  });
