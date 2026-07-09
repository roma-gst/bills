import { Trash2 } from "lucide-react";
import formatCurrency from "../../utils/formatCurrency";

function RevenueSection({ revenues, onRemove }) {
  return (
    <section className="rounded-3xl bg-white p-6 shadow-sm">
      <h3 className="text-2xl font-bold text-zinc-900">Receitas</h3>

      <div className="mt-4 space-y-3">
        {revenues.length ? (
          revenues.map((revenue, index) => (
            <div
              key={index}
              className="flex items-center justify-between rounded-xl bg-zinc-50 p-3"
            >
              <div>
                <p className="font-medium">{revenue.descricao}</p>

                <p className="text-sm font-semibold text-emerald-600">
                  {formatCurrency(revenue.valor)}
                </p>
              </div>

              <button
                onClick={() => {
                  if (
                    window.confirm("Deseja realmente excluir esta receita?")
                  ) {
                    onRemove(index);
                  }
                }}
                className="rounded-lg p-2 text-zinc-400 transition hover:bg-red-50 hover:text-red-500"
              >
                <Trash2 size={18} />
              </button>
            </div>
          ))
        ) : (
          <div className="rounded-2xl border border-dashed border-zinc-300 py-10 text-center">
            <p className="font-medium text-zinc-600">
              Nenhuma receita cadastrada
            </p>

            <p className="mt-2 text-sm text-zinc-400">
              Clique em <strong>+ Receita</strong> para adicionar a primeira.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

export default RevenueSection;
