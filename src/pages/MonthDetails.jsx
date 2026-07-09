import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

import { useFinancial } from "../context/FinancialContext";
import MonthSummaryCard from "../components/month/MonthSummaryCard";
import RevenueSection from "../components/month/RevenueSection";
import ExpenseSection from "../components/month/ExpenseSection";
import Button from "../components/ui/Button";
import Modal from "../components/ui/Modal";
import RevenueForm from "../components/forms/RevenueForm";
import ExpenseForm from "../components/forms/ExpenseForm";

function MonthDetails() {
  const [showRevenueForm, setShowRevenueForm] = useState(false);
  const [showExpenseForm, setShowExpenseForm] = useState(false);

  const { monthName } = useParams();

  const {
    monthsData,
    addRevenue,
    addFixedExpense,
    removeRevenue,
    removeFixedExpense,
  } = useFinancial();

  const month = monthsData.find(
    (item) => item.nome.toLowerCase() === monthName,
  );

  const totalRevenue = month
    ? month.receitas.reduce((total, item) => total + item.valor, 0)
    : 0;

  const totalExpenses = month
    ? month.despesasFixas.reduce((total, item) => total + item.valor, 0)
    : 0;

  const balance = totalRevenue - totalExpenses;

  function handleSaveRevenue(revenue) {
    addRevenue(revenue);
    setShowRevenueForm(false);
  }

  function handleSaveExpense(expense) {
    addFixedExpense(expense);
    setShowExpenseForm(false);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-100 via-stone-50 to-zinc-200 px-6 py-8">
      <main className="mx-auto max-w-6xl">
        <Link
          to="/"
          className="mb-8 inline-flex items-center gap-2 text-zinc-600 transition hover:text-zinc-900"
        >
          <ArrowLeft size={18} />
          Voltar
        </Link>

        <h1 className="text-5xl font-bold text-zinc-900">{month?.nome}</h1>

        <p className="mt-3 text-lg text-zinc-500">
          Aqui ficarão as receitas, despesas, metas e observações deste mês.
        </p>

        <MonthSummaryCard balance={balance} />

        <div className="mt-6 flex flex-wrap gap-4">
          <Button onClick={() => setShowRevenueForm(true)}>+ Receita</Button>

          <Button onClick={() => setShowExpenseForm(true)}>+ Despesa</Button>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <RevenueSection
            revenues={month?.receitas ?? []}
            onRemove={(index) => removeRevenue(month.nome, index)}
          />

          <ExpenseSection
            expenses={month?.despesasFixas ?? []}
            onRemove={(index) => removeFixedExpense(month.nome, index)}
          />
        </div>

        {showRevenueForm && (
          <Modal title="Nova Receita" onClose={() => setShowRevenueForm(false)}>
            <RevenueForm
              months={monthsData}
              onSave={handleSaveRevenue}
              onCancel={() => setShowRevenueForm(false)}
              defaultMonth={month?.nome}
              showMonthSelect={false}
            />
          </Modal>
        )}

        {showExpenseForm && (
          <Modal title="Nova Despesa" onClose={() => setShowExpenseForm(false)}>
            <ExpenseForm
              months={monthsData}
              onSave={handleSaveExpense}
              onCancel={() => setShowExpenseForm(false)}
              defaultMonth={month?.nome}
              showMonthSelect={false}
            />
          </Modal>
        )}
      </main>
    </div>
  );
}

export default MonthDetails;
