export default function Paginacion({ pagina, totalPaginas, irA }) {
  if (totalPaginas <= 1) return null;

  const paginas = [];
  for (let i = 1; i <= totalPaginas; i++) paginas.push(i);

  return (
    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
      <p className="text-xs text-gray-400">
        Página {pagina} de {totalPaginas}
      </p>
      <div className="flex items-center gap-1">
        <button
          onClick={() => irA(pagina - 1)}
          disabled={pagina === 1}
          className="w-7 h-7 flex items-center justify-center border border-gray-200 text-gray-500 hover:border-[var(--color-wine)] hover:text-[var(--color-wine)] disabled:opacity-30 disabled:cursor-not-allowed transition text-xs"
        >
          ‹
        </button>
        {paginas.map((p) => (
          <button
            key={p}
            onClick={() => irA(p)}
            className={`w-7 h-7 flex items-center justify-center border text-xs transition ${
              p === pagina
                ? "border-[var(--color-wine)] bg-[var(--color-wine)] text-white"
                : "border-gray-200 text-gray-500 hover:border-[var(--color-wine)] hover:text-[var(--color-wine)]"
            }`}
          >
            {p}
          </button>
        ))}
        <button
          onClick={() => irA(pagina + 1)}
          disabled={pagina === totalPaginas}
          className="w-7 h-7 flex items-center justify-center border border-gray-200 text-gray-500 hover:border-[var(--color-wine)] hover:text-[var(--color-wine)] disabled:opacity-30 disabled:cursor-not-allowed transition text-xs"
        >
          ›
        </button>
      </div>
    </div>
  );
}
