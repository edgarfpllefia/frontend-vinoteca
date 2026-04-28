import { apiFetch } from "./api";

export const getVinos = () => apiFetch("/vinos").then((res) => res.datos);

export const getVinoById = (id) => apiFetch(`/vinos/${id}`);

export const createVino = (formData) =>
  apiFetch("/vinos", { method: "POST", body: formData });

export const updateVino = (id, data) =>
  apiFetch(`/vinos/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });

export const updateVinoImatge = (id, formData) =>
  apiFetch(`/vinos/${id}/imatge`, { method: "PATCH", body: formData });

export const deleteVino = (id) =>
  apiFetch(`/vinos/${id}`, { method: "DELETE" });
