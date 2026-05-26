import { apiFetch } from "./api";

export const login = (email, password) =>
  apiFetch("/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });

export const registro = (formData) =>
  apiFetch("/auth/registro", { method: "POST", body: formData });

export const updatePerfil = (formData) =>
  apiFetch("/auth/perfil", { method: "PUT", body: formData });
