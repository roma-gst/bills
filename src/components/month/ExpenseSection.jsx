import { Trash2 } from "lucide-react";
import formatCurrency from "../../utils/formatCurrency";

function ExpenseSection({ expenses, onRemove }) {
  return (
    <section className="rounded-3xl bg-white p-6 shadow-sm">
      <h3 className="text-2xl font-bold text-zinc-900">Despesas</h3>

      <div className="mt-4 space-y-3">
        {expenses.length ? (
          expenses.map((expense, index) => (
            <div
              key={index}
              className="flex items-center justify-between rounded-xl bg-zinc-50 p-3"
            >
              <div>
                <p className="font-medium">{expense.descricao}</p>

                <p className="text-sm font-semibold text-red-500">
                  {formatCurrency(expense.valor)}
                </p>
              </div>

              <button
                onClick={() => {
                  if (
                    window.confirm("Deseja realmente excluir esta despesa?")
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
              Nenhuma despesa cadastrada
            </p>

            <p className="mt-2 text-sm text-zinc-400">
              Clique em <strong>+ Despesa</strong> para adicionar a primeira.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

export default ExpenseSection;
