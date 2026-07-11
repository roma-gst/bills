import { ArrowDownRight, ArrowUpRight, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

import formatCurrency from "../../utils/formatCurrency";

function MonthCard({ month }) {
  const navigate = useNavigate();

  const totalRevenue = month.receitas.reduce(
    (total, revenue) => total + revenue.valor,
    0,
  );

  const totalExpenses = month.despesasFixas.reduce(
    (total, expense) => total + expense.valor,
    0,
  );

  const balance = totalRevenue - totalExpenses;
  const positive = balance >= 0;

  function openMonth() {
    navigate(`/month/${month.nome.toLowerCase()}`);
  }

  function handleKeyDown(event) {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openMonth();
    }
  }

  return (
    <article
      role="button"
      tabIndex={0}
      onClick={openMonth}
      onKeyDown={handleKeyDown}
      className="group cursor-pointer rounded-3xl border border-zinc-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-6 shadow-sm transition-all duration-200 transition-all duration-300 hover:-translate-y-1 hover:border-indigo-200 hover:shadow-xl focus:outline-none transition focus:ring-4 focus:ring-indigo-500/20 dark:border-slate-700 dark:bg-slate-900 dark:hover:border-indigo-500/50"
    >
      <div className="mb-6 flex items-center justify-between gap-3">
        <h3 className="text-2xl font-bold text-zinc-900 dark:text-white dark:text-white dark:text-white">
          {month.nome}
        </h3>

        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold ${
            positive
              ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-400"
              : "bg-red-100 text-red-700 dark:bg-red-500/15 dark:text-red-400"
          }`}
        >
          {positive ? "Positivo" : "Negativo"}
        </span>
      </div>

      <div>
        <p className="text-sm text-zinc-500 dark:text-slate-400 dark:text-slate-400">
          Saldo previsto
        </p>

        <h2
          className={`mt-2 text-3xl font-bold ${
            positive
              ? "text-emerald-600 dark:text-emerald-400"
              : "text-red-500 dark:text-red-400"
          }`}
        >
          {formatCurrency(balance)}
        </h2>
      </div>

      <div className="my-6 h-px bg-zinc-200 dark:bg-slate-700 dark:bg-slate-700" />

      <div className="space-y-4">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <ArrowUpRight size={18} className="text-emerald-500" />

            <span className="text-zinc-500 dark:text-slate-400 dark:text-slate-400">Receitas</span>
          </div>

          <span className="font-semibold text-emerald-600 dark:text-emerald-400">
            {formatCurrency(totalRevenue)}
          </span>
        </div>

        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <ArrowDownRight size={18} className="text-red-500" />

            <span className="text-zinc-500 dark:text-slate-400 dark:text-slate-400">Despesas</span>
          </div>

          <span className="font-semibold text-red-500 dark:text-red-400">
            {formatCurrency(totalExpenses)}
          </span>
        </div>
      </div>

      <div className="my-6 h-px bg-zinc-200 dark:bg-slate-700 dark:bg-slate-700" />

      <div className="flex items-center justify-between gap-3">
        <span className="text-sm text-zinc-500 dark:text-slate-400 dark:text-slate-400">
          {month.receitas.length} receitas • {month.despesasFixas.length}{" "}
          despesas
        </span>

        <span className="flex items-center gap-1 font-semibold text-indigo-600 transition-all group-hover:gap-2 dark:text-indigo-400">
          Abrir
          <ChevronRight size={18} />
        </span>
      </div>
    </article>
  );
}

export default MonthCard;
