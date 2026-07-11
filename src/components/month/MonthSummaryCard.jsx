import { ArrowDownRight, ArrowUpRight, Wallet } from "lucide-react";

import formatCurrency from "../../utils/formatCurrency";

function MonthSummaryCard({ balance, totalRevenue = 0, totalExpenses = 0 }) {
  const positive = balance >= 0;

  return (
    <section className="mt-8 rounded-3xl border border-zinc-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-6 shadow-sm transition-all duration-200 transition-colors dark:border-slate-700 dark:bg-slate-900">
      <div className="grid gap-6 md:grid-cols-3">
        <div className="rounded-2xl bg-zinc-50 dark:bg-slate-800 p-5 transition-colors dark:bg-slate-800">
          <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400">
            <ArrowUpRight size={22} />
          </div>

          <p className="text-sm text-zinc-500 dark:text-slate-400 dark:text-slate-400">Receitas</p>

          <h3 className="mt-2 text-2xl font-bold text-emerald-600 dark:text-emerald-400">
            {formatCurrency(totalRevenue)}
          </h3>
        </div>

        <div className="rounded-2xl bg-zinc-50 dark:bg-slate-800 p-5 transition-colors dark:bg-slate-800">
          <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-red-100 text-red-500 dark:bg-red-500/10 dark:text-red-400">
            <ArrowDownRight size={22} />
          </div>

          <p className="text-sm text-zinc-500 dark:text-slate-400 dark:text-slate-400">Despesas</p>

          <h3 className="mt-2 text-2xl font-bold text-red-500 dark:text-red-400">
            {formatCurrency(totalExpenses)}
          </h3>
        </div>

        <div className="rounded-2xl bg-zinc-50 dark:bg-slate-800 p-5 transition-colors dark:bg-slate-800">
          <div
            className={`mb-4 flex h-11 w-11 items-center justify-center rounded-xl ${
              positive
                ? "bg-indigo-100 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400"
                : "bg-orange-100 text-orange-600 dark:bg-orange-500/10 dark:text-orange-400"
            }`}
          >
            <Wallet size={22} />
          </div>

          <p className="text-sm text-zinc-500 dark:text-slate-400 dark:text-slate-400">Saldo</p>

          <h3
            className={`mt-2 text-2xl font-bold ${
              positive
                ? "text-indigo-600 dark:text-indigo-400"
                : "text-orange-600 dark:text-orange-400"
            }`}
          >
            {formatCurrency(balance)}
          </h3>
        </div>
      </div>
    </section>
  );
}

export default MonthSummaryCard;
