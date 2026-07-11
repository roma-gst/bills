import SummaryItem from "../ui/SummaryItem";
import formatCurrency from "../../utils/formatCurrency";

function DashboardSummary({ totalRevenue, totalExpenses, balance }) {
  return (
    <section className="grid gap-5 md:grid-cols-3">
      <SummaryItem
        title="Receitas"
        value={formatCurrency(totalRevenue)}
        variant="success"
      />

      <SummaryItem
        title="Despesas"
        value={formatCurrency(totalExpenses)}
        variant="danger"
      />

      <SummaryItem
        title="Saldo"
        value={formatCurrency(balance)}
        variant={balance >= 0 ? "primary" : "warning"}
      />
    </section>
  );
}

export default DashboardSummary;
