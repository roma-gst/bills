import SummaryItem from "../ui/SummaryItem";
import formatCurrency from "../../utils/formatCurrency";

function Dashboard({ totalRevenue, totalFixedExpenses, balance }) {
  return (
    <div className="mb-8 rounded-xl bg-white p-6 shadow">
      <h2 className="mb-4 text-xl font-bold">Resumo Geral</h2>

      <div className="space-y-2">
        <SummaryItem
          label="Receitas"
          value={formatCurrency(totalRevenue)}
          className="text-green-600"
        />

        <SummaryItem
          label="Despesas"
          value={formatCurrency(totalFixedExpenses)}
          className="text-red-600"
        />

        <SummaryItem
          label="Saldo"
          value={formatCurrency(balance)}
          className="font-semibold"
        />
      </div>
    </div>
  );
}

export default Dashboard;
