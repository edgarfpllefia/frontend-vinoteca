export const BASE_UPLOADS = `${import.meta.env.VITE_API_URL}/uploads/`;

// Devuelve la URL correcta tanto para imágenes antiguas (ruta relativa)
// como para imágenes nuevas subidas a Cloudinary (URL completa)
export function getImageUrl(imatge) {
  if (!imatge) return null;
  if (imatge.startsWith("http://") || imatge.startsWith("https://")) return imatge;
  return `${BASE_UPLOADS}${imatge.replace(/^uploads[\\/]/, "")}`;
}
