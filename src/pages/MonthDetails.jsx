import { useState } from "react";
import { Link, useParams } from "react-router-dom";
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
  const [revenueModal, setRevenueModal] = useState({
    open: false,
    editingIndex: null,
  });

  const [expenseModal, setExpenseModal] = useState({
    open: false,
    editingIndex: null,
  });

  const { monthName } = useParams();

  const {
    monthsData,
    addRevenue,
    addFixedExpense,
    updateRevenue,
    updateFixedExpense,
    removeRevenue,
    removeFixedExpense,
  } = useFinancial();

  const month = monthsData.find(
    (item) => item.nome.toLowerCase() === monthName,
  );

  if (!month) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-100 px-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-zinc-900">
            Mês não encontrado
          </h1>

          <Link
            to="/"
            className="mt-5 inline-flex text-blue-600 hover:underline"
          >
            Voltar para a página inicial
          </Link>
        </div>
      </div>
    );
  }

  const totalRevenue = month.receitas.reduce(
    (total, item) => total + item.valor,
    0,
  );

  const totalExpenses = month.despesasFixas.reduce(
    (total, item) => total + item.valor,
    0,
  );

  const balance = totalRevenue - totalExpenses;

  const editingRevenue =
    revenueModal.editingIndex !== null
      ? month.receitas[revenueModal.editingIndex]
      : null;

  const editingExpense =
    expenseModal.editingIndex !== null
      ? month.despesasFixas[expenseModal.editingIndex]
      : null;

  function closeRevenueModal() {
    setRevenueModal({
      open: false,
      editingIndex: null,
    });
  }

  function closeExpenseModal() {
    setExpenseModal({
      open: false,
      editingIndex: null,
    });
  }

  function handleSaveRevenue(revenue) {
    if (revenueModal.editingIndex !== null) {
      updateRevenue(month.nome, revenueModal.editingIndex, revenue);
    } else {
      addRevenue(revenue);
    }

    closeRevenueModal();
  }

  function handleSaveExpense(expense) {
    if (expenseModal.editingIndex !== null) {
      updateFixedExpense(month.nome, expenseModal.editingIndex, expense);
    } else {
      addFixedExpense(expense);
    }

    closeExpenseModal();
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

        <h1 className="text-5xl font-bold text-zinc-900">{month.nome}</h1>

        <p className="mt-3 text-lg text-zinc-500">
          Acompanhe as receitas e despesas previstas para este mês.
        </p>

        <MonthSummaryCard balance={balance} />

        <div className="mt-6 flex flex-wrap gap-4">
          <Button
            onClick={() =>
              setRevenueModal({
                open: true,
                editingIndex: null,
              })
            }
          >
            + Receita
          </Button>

          <Button
            onClick={() =>
              setExpenseModal({
                open: true,
                editingIndex: null,
              })
            }
          >
            + Despesa
          </Button>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <RevenueSection
            revenues={month.receitas}
            onEdit={(index) =>
              setRevenueModal({
                open: true,
                editingIndex: index,
              })
            }
            onRemove={(index) => removeRevenue(month.nome, index)}
          />

          <ExpenseSection
            expenses={month.despesasFixas}
            onEdit={(index) =>
              setExpenseModal({
                open: true,
                editingIndex: index,
              })
            }
            onRemove={(index) => removeFixedExpense(month.nome, index)}
          />
        </div>

        {revenueModal.open && (
          <Modal
            title={editingRevenue ? "Editar Receita" : "Nova Receita"}
            onClose={closeRevenueModal}
          >
            <RevenueForm
              months={monthsData}
              onSave={handleSaveRevenue}
              onCancel={closeRevenueModal}
              defaultMonth={month.nome}
              showMonthSelect={false}
              initialValues={
                editingRevenue
                  ? {
                      ...editingRevenue,
                      month: month.nome,
                    }
                  : null
              }
            />
          </Modal>
        )}

        {expenseModal.open && (
          <Modal
            title={editingExpense ? "Editar Despesa" : "Nova Despesa"}
            onClose={closeExpenseModal}
          >
            <ExpenseForm
              months={monthsData}
              onSave={handleSaveExpense}
              onCancel={closeExpenseModal}
              defaultMonth={month.nome}
              showMonthSelect={false}
              initialValues={
                editingExpense
                  ? {
                      ...editingExpense,
                      month: month.nome,
                    }
                  : null
              }
            />
          </Modal>
        )}
      </main>
    </div>
  );
}

export default MonthDetails;
