import { apiFetch } from "./api";

export const getUsuarios = () => apiFetch("/usuarios").then((res) => res.datos);

export const getUsuarioById = (id) => apiFetch(`/usuarios/${id}`);

export const updateUsuario = (id, data) =>
  apiFetch(`/usuarios/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });

export const deleteUsuario = (id) =>
  apiFetch(`/usuarios/${id}`, { method: "DELETE" });
