import { useState } from "react";
// import MonthCard from "../components/home/MonthCard";
// import MonthListItem from "../components/home/MonthListItem";
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

  function handleSaveRevenue(revenue) {
    addRevenue(revenue);
    setShowRevenueForm(false);
  }

  function handleSaveFixedExpense(expense) {
    addFixedExpense(expense);
    setShowFixedExpenseForm(false);
  }

  const totalRevenue = monthsData.reduce((total, month) => {
    const monthRevenue = month.receitas.reduce(
      (sum, receita) => sum + receita.valor,
      0,
    );

    return total + monthRevenue;
  }, 0);

  const totalFixedExpenses = monthsData.reduce((total, month) => {
    const monthExpenses = month.despesasFixas.reduce(
      (sum, despesa) => sum + despesa.valor,
      0,
    );

    return total + monthExpenses;
  }, 0);

  const balance = totalRevenue - totalFixedExpenses;

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-100 via-stone-50 to-zinc-200 px-6 py-6">
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

        <PlanningSection monthsData={monthsData} />
      </main>
    </div>
  );
}

export default Home;
