import { Pencil, Trash2 } from "lucide-react";
import formatCurrency from "../../utils/formatCurrency";

function RevenueSection({ revenues, onEdit, onRemove }) {
  return (
    <section className="rounded-3xl bg-white p-6 shadow-sm">
      <h3 className="text-2xl font-bold text-zinc-900">Receitas</h3>

      <div className="mt-4 space-y-3">
        {revenues.length ? (
          revenues.map((revenue, index) => (
            <div
              key={`${revenue.descricao}-${index}`}
              className="flex items-center justify-between gap-4 rounded-2xl bg-zinc-50 p-4"
            >
              <div className="min-w-0">
                <p className="truncate font-medium text-zinc-900">
                  {revenue.descricao}
                </p>

                <p className="mt-1 text-sm font-semibold text-emerald-600">
                  {formatCurrency(revenue.valor)}
                </p>
              </div>

              <div className="flex shrink-0 items-center gap-1">
                <button
                  type="button"
                  onClick={() => onEdit(index)}
                  aria-label={`Editar ${revenue.descricao}`}
                  className="rounded-xl p-2 text-zinc-400 transition hover:bg-blue-50 hover:text-blue-600"
                >
                  <Pencil size={18} />
                </button>

                <button
                  type="button"
                  onClick={() => {
                    const confirmed = window.confirm(
                      "Deseja realmente excluir esta receita?",
                    );

                    if (confirmed) {
                      onRemove(index);
                    }
                  }}
                  aria-label={`Excluir ${revenue.descricao}`}
                  className="rounded-xl p-2 text-zinc-400 transition hover:bg-red-50 hover:text-red-500"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="rounded-2xl border border-dashed border-zinc-300 py-10 text-center">
            <p className="font-medium text-zinc-600">
              Nenhuma receita cadastrada
            </p>

            <p className="mt-2 text-sm text-zinc-400">
              Clique em <strong>+ Receita</strong> para adicionar.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

export default RevenueSection;
