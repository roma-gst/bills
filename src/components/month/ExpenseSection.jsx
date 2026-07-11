import { Pencil, Trash2 } from "lucide-react";

import formatCurrency from "../../utils/formatCurrency";

function ExpenseSection({ expenses, onEdit, onRemove }) {
  return (
    <section className="rounded-3xl border border-zinc-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-6 shadow-sm transition-all duration-200 transition-colors dark:border-slate-700 dark:bg-slate-900">
      <h3 className="text-2xl font-bold text-zinc-900 dark:text-white dark:text-white dark:text-white">
        Despesas
      </h3>

      <div className="mt-4 space-y-3">
        {expenses.length ? (
          expenses.map((expense, index) => (
            <div
              key={expense.id ?? `${expense.descricao}-${index}`}
              className="flex items-center justify-between gap-4 rounded-2xl bg-zinc-50 dark:bg-slate-800 p-4 transition-colors dark:bg-slate-800"
            >
              <div className="min-w-0">
                <p className="truncate font-medium text-zinc-900 dark:text-white dark:text-white dark:text-white">
                  {expense.descricao}
                </p>

                <p className="mt-1 text-sm font-semibold text-red-500 dark:text-red-400">
                  {formatCurrency(expense.valor)}
                </p>
              </div>

              <div className="flex shrink-0 items-center gap-1">
                <button
                  type="button"
                  onClick={() => onEdit(index)}
                  aria-label={`Editar ${expense.descricao}`}
                  className="rounded-xl p-2 text-zinc-400 transition hover:bg-indigo-50 hover:text-indigo-600 dark:text-slate-400 dark:hover:bg-indigo-500/10 dark:hover:text-indigo-400"
                >
                  <Pencil size={18} />
                </button>

                <button
                  type="button"
                  onClick={() => {
                    const confirmed = window.confirm(
                      "Deseja realmente excluir esta despesa?",
                    );

                    if (confirmed) {
                      onRemove(index);
                    }
                  }}
                  aria-label={`Excluir ${expense.descricao}`}
                  className="rounded-xl p-2 text-zinc-400 transition hover:bg-red-50 hover:text-red-500 dark:text-slate-400 dark:hover:bg-red-500/10 dark:hover:text-red-400"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="rounded-2xl border border-dashed border-zinc-300 py-10 text-center dark:border-slate-700">
            <p className="font-medium text-zinc-600 dark:text-slate-300">
              Nenhuma despesa cadastrada
            </p>

            <p className="mt-2 text-sm text-zinc-400 dark:text-slate-500 dark:text-slate-400">
              Clique em <strong>+ Despesa</strong> para adicionar.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

export default ExpenseSection;
