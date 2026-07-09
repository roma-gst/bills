import { ArrowUpRight, ArrowDownRight, ChevronRight } from "lucide-react";
import formatCurrency from "../../utils/formatCurrency";
import { useNavigate } from "react-router-dom";

function MonthCard({ month }) {
  const navigate = useNavigate();
  const totalRevenue = month.receitas.reduce(
    (total, receita) => total + receita.valor,
    0,
  );

  const totalExpenses = month.despesasFixas.reduce(
    (total, despesa) => total + despesa.valor,
    0,
  );

  const balance = totalRevenue - totalExpenses;

  const positive = balance >= 0;

  return (
    <article
      onClick={() => navigate(`/month/${month.nome.toLowerCase()}`)}
      className="
        group
        rounded-3xl
        border
        border-zinc-200
        bg-white
        p-6
        shadow-sm
        transition-all
        duration-300
        hover:-translate-y-1
        hover:shadow-xl
      "
    >
      {/* Cabeçalho */}
      <div className="mb-6 flex items-center justify-between">
        <h3 className="text-3xl font-bold text-zinc-900">{month.nome}</h3>

        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold ${
            positive
              ? "bg-emerald-100 text-emerald-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {positive ? "Positivo" : "Negativo"}
        </span>
      </div>

      {/* Saldo */}
      <div>
        <p className="text-sm text-zinc-500">Saldo previsto</p>

        <h2
          className={`mt-2 text-4xl font-bold ${
            positive ? "text-emerald-600" : "text-red-500"
          }`}
        >
          {formatCurrency(balance)}
        </h2>
      </div>

      <div className="my-6 h-px bg-zinc-200" />

      {/* Estatísticas */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ArrowUpRight size={18} className="text-emerald-500" />

            <span className="text-zinc-500">Receitas</span>
          </div>

          <span className="font-semibold text-emerald-600">
            {formatCurrency(totalRevenue)}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ArrowDownRight size={18} className="text-red-500" />

            <span className="text-zinc-500">Despesas</span>
          </div>

          <span className="font-semibold text-red-500">
            {formatCurrency(totalExpenses)}
          </span>
        </div>
      </div>

      <div className="my-6 h-px bg-zinc-200" />

      {/* Rodapé */}
      <div className="flex items-center justify-between">
        <span className="text-sm text-zinc-500">
          {month.receitas.length} receitas • {month.despesasFixas.length}{" "}
          despesas
        </span>

        <div className="flex items-center gap-1 font-semibold text-indigo-600">
          Abrir
          <ChevronRight size={18} />
        </div>
      </div>
    </article>
  );
}

export default MonthCard;
