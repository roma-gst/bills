import { useState } from "react";
import { ArrowRight, Tags, WalletCards } from "lucide-react";
import { Link } from "react-router-dom";

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

        <section className="mt-6 grid gap-4 sm:grid-cols-2">
          <Link
            to="/accounts"
            className="group flex items-center justify-between rounded-3xl border border-zinc-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg dark:border-slate-700 dark:bg-slate-900"
          >
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-100 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400">
                <WalletCards size={24} />
              </div>

              <div>
                <h2 className="font-bold text-zinc-900 dark:text-white">
                  Contas
                </h2>

                <p className="text-sm text-zinc-500 dark:text-slate-400">
                  Saldos e contas financeiras
                </p>
              </div>
            </div>

            <ArrowRight
              size={20}
              className="text-zinc-400 transition group-hover:translate-x-1 group-hover:text-indigo-600 dark:group-hover:text-indigo-400"
            />
          </Link>

          <Link
            to="/categories"
            className="group flex items-center justify-between rounded-3xl border border-zinc-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg dark:border-slate-700 dark:bg-slate-900"
          >
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-100 text-violet-600 dark:bg-violet-500/10 dark:text-violet-400">
                <Tags size={24} />
              </div>

              <div>
                <h2 className="font-bold text-zinc-900 dark:text-white">
                  Categorias
                </h2>

                <p className="text-sm text-zinc-500 dark:text-slate-400">
                  Organize seus lançamentos
                </p>
              </div>
            </div>

            <ArrowRight
              size={20}
              className="text-zinc-400 transition group-hover:translate-x-1 group-hover:text-violet-600 dark:group-hover:text-violet-400"
            />
          </Link>
        </section>

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
