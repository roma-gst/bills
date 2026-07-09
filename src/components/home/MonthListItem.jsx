import { Link } from "react-router-dom";
import formatCurrency from "../../utils/formatCurrency";

function MonthListItem({ month }) {
  const totalReceitas = month.receitas.reduce(
    (total, receita) => total + receita.valor,
    0,
  );

  const totalDespesas = month.despesasFixas.reduce(
    (total, despesa) => total + despesa.valor,
    0,
  );

  const saldo = totalReceitas - totalDespesas;

  return (
    <Link to={`/month/${month.nome}`} className="block">
      <div className="mb-3 flex items-center justify-between rounded-xl bg-white p-5 shadow transition hover:shadow-lg hover:-translate-y-0.5">
        <div>
          <h2 className="text-lg font-semibold">{month.nome}</h2>

          <p className="mt-1 text-sm text-zinc-500">
            {month.receitas.length} receitas • {month.despesasFixas.length}{" "}
            despesas
          </p>
        </div>

        <div className="text-right">
          <p
            className={`font-bold ${
              saldo >= 0 ? "text-green-600" : "text-red-600"
            }`}
          >
            {formatCurrency(saldo)}
          </p>

          <p className="text-sm text-zinc-400">Ver detalhes →</p>
        </div>
      </div>
    </Link>
  );
}

export default MonthListItem;
