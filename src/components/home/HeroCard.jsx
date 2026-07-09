import { ArrowUpRight, ArrowDownRight, CircleDollarSign } from "lucide-react";
import formatCurrency from "../../utils/formatCurrency";

function HeroCard({ totalRevenue, totalFixedExpenses, balance }) {
  return (
    <section className="mb-12 overflow-hidden rounded-[28px] bg-gradient-to-r from-slate-900 via-slate-900 to-indigo-950 p-8 text-white shadow-xl">
      <div className="grid gap-10 md:grid-cols-[2fr_1fr_1fr]">
        <div>
          <p className="flex items-center gap-2 text-sm text-zinc-400">
            <CircleDollarSign size={16} />
            Saldo previsto
          </p>

          <h2 className="mt-3 text-4xl lg:text-5xl font-bold">
            {formatCurrency(balance)}
          </h2>

          <p
            className={`mt-3 text-base ${
              balance >= 0 ? "text-green-300" : "text-red-300"
            }`}
          >
            {balance >= 0
              ? "✔ Seu planejamento está saudável."
              : "⚠ Revise suas despesas para os próximos meses."}
          </p>

          <div className="mt-6">
            <div className="mb-2 flex items-center justify-between text-sm text-zinc-300">
              <span>Meta mensal</span>
              <span>71%</span>
            </div>

            <div className="h-2 overflow-hidden rounded-full bg-white/10">
              <div className="h-full w-[71%] rounded-full bg-emerald-400" />
            </div>
          </div>

          <span
            className={`mt-5 inline-flex rounded-full px-4 py-2 text-sm font-medium ${
              balance >= 0
                ? "bg-green-500/20 text-green-300"
                : "bg-red-500/20 text-red-300"
            }`}
          >
            {balance >= 0 ? "Positivo" : "Negativo"}
          </span>
        </div>

        <div className="border-l border-white/5 pl-8">
          <div className="flex items-center gap-2 text-green-400">
            <ArrowUpRight size={18} />
            <span className="font-medium">Receitas</span>
          </div>

          <p className="mt-3 text-3xl font-bold text-green-400">
            {formatCurrency(totalRevenue)}
          </p>
        </div>

        <div className="border-l border-white/5 pl-8">
          <div className="flex items-center gap-2 text-red-400">
            <ArrowDownRight size={18} />
            <span className="font-medium">Despesas</span>
          </div>

          <p className="mt-3 text-3xl font-bold text-red-400">
            {formatCurrency(totalFixedExpenses)}
          </p>
        </div>
      </div>
    </section>
  );
}

export default HeroCard;
