import { apiFetch } from "./api";

export const getCervezas = () => apiFetch("/cervezas").then((res) => res.datos);

export const getCervezaById = (id) => apiFetch(`/cervezas/${id}`);

export const createCerveza = (formData) =>
  apiFetch("/cervezas", { method: "POST", body: formData });

export const updateCerveza = (id, data) =>
  apiFetch(`/cervezas/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });

export const updateCervezaImatge = (id, formData) =>
  apiFetch(`/cervezas/${id}/imatge`, { method: "PATCH", body: formData });

export const deleteCerveza = (id) =>
  apiFetch(`/cervezas/${id}`, { method: "DELETE" });
