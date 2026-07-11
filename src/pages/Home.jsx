import { useState } from "react";

import { useFinancial } from "../context/FinancialContext";

import Modal from "../components/ui/Modal";
import RevenueForm from "../components/forms/RevenueForm";
import ExpenseForm from "../components/forms/ExpenseForm";
import HomeHeader from "../components/home/HomeHeader";
import HeroCard from "../components/home/HeroCard";
import Greeting from "../components/home/Greeting";
import PlanningSection from "../components/home/PlanningSection";

function Home() {
  const [showRevenueForm, setShowRevenueForm] = useState(false);
  const [showFixedExpenseForm, setShowFixedExpenseForm] = useState(false);

  const { monthsData, addRevenue, addFixedExpense } = useFinancial();

  async function handleSaveRevenue(revenue) {
    await addRevenue(revenue);
    setShowRevenueForm(false);
  }

  async function handleSaveFixedExpense(expense) {
    await addFixedExpense(expense);
    setShowFixedExpenseForm(false);
  }

  const totalRevenue = monthsData.reduce((total, month) => {
    return (
      total + month.receitas.reduce((sum, receita) => sum + receita.valor, 0)
    );
  }, 0);

  const totalFixedExpenses = monthsData.reduce((total, month) => {
    return (
      total +
      month.despesasFixas.reduce((sum, despesa) => sum + despesa.valor, 0)
    );
  }, 0);

  const balance = totalRevenue - totalFixedExpenses;

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-100 via-stone-50 to-zinc-200 px-6 py-6 transition-colors dark:from-slate-950 dark:via-slate-950 dark:to-slate-900">
      <main className="mx-auto max-w-6xl">
        <HomeHeader
          onAddRevenue={() => setShowRevenueForm(true)}
          onAddFixedExpense={() => setShowFixedExpenseForm(true)}
        />

        <Greeting />

        <HeroCard
          totalRevenue={totalRevenue}
          totalFixedExpenses={totalFixedExpenses}
          balance={balance}
        />

        <PlanningSection monthsData={monthsData} />

        {showRevenueForm && (
          <Modal title="Nova Receita" onClose={() => setShowRevenueForm(false)}>
            <RevenueForm
              months={monthsData}
              onSave={handleSaveRevenue}
              onCancel={() => setShowRevenueForm(false)}
            />
          </Modal>
        )}

        {showFixedExpenseForm && (
          <Modal
            title="Nova Despesa Fixa"
            onClose={() => setShowFixedExpenseForm(false)}
          >
            <ExpenseForm
              months={monthsData}
              onSave={handleSaveFixedExpense}
              onCancel={() => setShowFixedExpenseForm(false)}
            />
          </Modal>
        )}
      </main>
    </div>
  );
}

export default Home;
