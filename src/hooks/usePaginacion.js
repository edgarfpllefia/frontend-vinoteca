import { useState, useMemo } from "react";

export function usePaginacion(items, porPagina = 8) {
  const [pagina, setPagina] = useState(1);

  const totalPaginas = Math.max(1, Math.ceil(items.length / porPagina));

  // Si los items cambian (búsqueda) volvemos a la página 1
  const itemsPagina = useMemo(() => {
    setPagina(1);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items.length]);

  const inicio = (pagina - 1) * porPagina;
  const paginados = items.slice(inicio, inicio + porPagina);

  const irA = (n) => setPagina(Math.min(Math.max(1, n), totalPaginas));

  return { paginados, pagina, totalPaginas, irA };
}
