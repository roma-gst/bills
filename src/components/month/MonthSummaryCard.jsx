import formatCurrency from "../../utils/formatCurrency";

function MonthSummaryCard({ balance }) {
  return (
    <section className="mt-10 rounded-3xl bg-slate-900 p-8 text-white shadow-xl">
      <p className="text-sm text-zinc-400">Saldo previsto</p>

      <h2 className="mt-3 text-5xl font-bold">{formatCurrency(balance)}</h2>

      <p className={`mt-4 ${balance >= 0 ? "text-green-300" : "text-red-300"}`}>
        {balance >= 0
          ? "✔ Seu planejamento está saudável."
          : "⚠ Este mês está com saldo negativo."}
      </p>
    </section>
  );
}

export default MonthSummaryCard;
