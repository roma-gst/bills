import { useMemo, useState } from "react";
import {
  ArrowLeft,
  CalendarDays,
  CheckCircle2,
  Circle,
  Pencil,
  Tag,
  Trash2,
  TrendingDown,
  TrendingUp,
  Wallet,
} from "lucide-react";
import { Link, useParams } from "react-router-dom";

import { useFinancial } from "../context/FinancialContext";
import useAccounts from "../hooks/useAccounts";
import useCategories from "../hooks/useCategories";

import MonthSummaryCard from "../components/month/MonthSummaryCard";

import Button from "../components/ui/Button";
import Modal from "../components/ui/Modal";

import RevenueForm from "../components/forms/RevenueForm";
import ExpenseForm from "../components/forms/ExpenseForm";

function formatCurrency(value) {
  return Number(value || 0).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

function formatDate(value) {
  if (!value) {
    return "";
  }

  return new Intl.DateTimeFormat("pt-BR", {
    timeZone: "UTC",
  }).format(new Date(`${value}T00:00:00Z`));
}

function TransactionSection({
  title,
  type,
  items,
  accountsById,
  categoriesById,
  loadingAccounts,
  loadingCategories,
  onEdit,
  onRemove,
  onTogglePaid,
}) {
  const [processingId, setProcessingId] = useState(null);

  const isIncome = type === "income";

  async function handleRemove(item, index) {
    const confirmed = window.confirm(
      `Deseja excluir o lançamento "${item.descricao}"?`,
    );

    if (!confirmed) {
      return;
    }

    try {
      setProcessingId(item.id);
      await onRemove(index);
    } catch (error) {
      console.error(error);
    } finally {
      setProcessingId(null);
    }
  }

  async function handleTogglePaid(item) {
    try {
      setProcessingId(item.id);
      await onTogglePaid(item.id, !item.paid);
    } catch (error) {
      console.error(error);
    } finally {
      setProcessingId(null);
    }
  }

  return (
    <section className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900">
      <div className="mb-6 flex items-center gap-3">
        <div
          className={`flex h-11 w-11 items-center justify-center rounded-2xl ${
            isIncome
              ? "bg-emerald-100 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400"
              : "bg-red-100 text-red-600 dark:bg-red-500/10 dark:text-red-400"
          }`}
        >
          {isIncome ? <TrendingUp size={22} /> : <TrendingDown size={22} />}
        </div>

        <div>
          <h2 className="text-xl font-bold text-zinc-900 dark:text-white">
            {title}
          </h2>

          <p className="text-sm text-zinc-500 dark:text-slate-400">
            {items.length} {items.length === 1 ? "lançamento" : "lançamentos"}
          </p>
        </div>
      </div>

      {items.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-zinc-300 px-5 py-10 text-center dark:border-slate-700">
          <p className="font-medium text-zinc-700 dark:text-slate-300">
            Nenhum lançamento cadastrado.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {items.map((item, index) => {
            const account = accountsById[item.account_id];
            const category = categoriesById[item.category_id];

            const accountName = loadingAccounts
              ? "Carregando conta..."
              : account?.name || "Conta não encontrada";

            const categoryName = loadingCategories
              ? "Carregando categoria..."
              : category?.name || "Sem categoria";

            const categoryIcon = category?.icon || "🏷️";
            const categoryColor = category?.color || "#64748b";
            const processing = processingId === item.id;

            return (
              <article
                key={item.id}
                className={`rounded-2xl border p-4 transition ${
                  item.paid
                    ? "border-emerald-200 bg-emerald-50/40 dark:border-emerald-900/60 dark:bg-emerald-950/10"
                    : "border-zinc-200 hover:bg-zinc-50 dark:border-slate-700 dark:hover:bg-slate-800/60"
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="break-words text-lg font-bold text-zinc-900 dark:text-white">
                        {item.descricao}
                      </h3>

                      <span
                        className={`rounded-full px-2.5 py-1 text-xs font-bold ${
                          item.paid
                            ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400"
                            : "bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400"
                        }`}
                      >
                        {item.paid
                          ? isIncome
                            ? "Recebida"
                            : "Paga"
                          : "Pendente"}
                      </span>
                    </div>

                    <p
                      className={`mt-1 text-xl font-bold ${
                        isIncome
                          ? "text-emerald-600 dark:text-emerald-400"
                          : "text-red-600 dark:text-red-400"
                      }`}
                    >
                      {isIncome ? "+ " : "- "}
                      {formatCurrency(item.valor)}
                    </p>
                  </div>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  <span className="inline-flex items-center gap-2 rounded-full bg-zinc-100 px-3 py-1.5 text-sm font-medium text-zinc-700 dark:bg-slate-800 dark:text-slate-300">
                    <Wallet size={15} />
                    {accountName}
                  </span>

                  <span
                    className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-sm font-medium"
                    style={{
                      color: categoryColor,
                      backgroundColor: `${categoryColor}18`,
                      border: `1px solid ${categoryColor}35`,
                    }}
                  >
                    {category ? <span>{categoryIcon}</span> : <Tag size={15} />}

                    {categoryName}
                  </span>

                  {item.due_date && (
                    <span className="inline-flex items-center gap-2 rounded-full bg-zinc-100 px-3 py-1.5 text-sm font-medium text-zinc-700 dark:bg-slate-800 dark:text-slate-300">
                      <CalendarDays size={15} />
                      {formatDate(item.due_date)}
                    </span>
                  )}
                </div>

                <div className="mt-4 grid gap-2 sm:grid-cols-3">
                  <button
                    type="button"
                    onClick={() => handleTogglePaid(item)}
                    disabled={processing}
                    aria-pressed={item.paid}
                    className={`flex items-center justify-center gap-2 rounded-xl border px-3 py-2 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-50 ${
                      item.paid
                        ? "border-emerald-300 text-emerald-700 hover:bg-emerald-50 dark:border-emerald-800 dark:text-emerald-400 dark:hover:bg-emerald-950/30"
                        : "border-amber-300 text-amber-700 hover:bg-amber-50 dark:border-amber-800 dark:text-amber-400 dark:hover:bg-amber-950/30"
                    }`}
                  >
                    {item.paid ? (
                      <CheckCircle2 size={17} />
                    ) : (
                      <Circle size={17} />
                    )}

                    {item.paid
                      ? isIncome
                        ? "Recebida"
                        : "Paga"
                      : isIncome
                        ? "Receber"
                        : "Pagar"}
                  </button>

                  <button
                    type="button"
                    onClick={() => onEdit(index)}
                    disabled={processing}
                    className="flex items-center justify-center gap-2 rounded-xl border border-zinc-200 px-3 py-2 text-sm font-semibold text-zinc-700 transition hover:bg-zinc-100 disabled:opacity-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
                  >
                    <Pencil size={17} />
                    Editar
                  </button>

                  <button
                    type="button"
                    onClick={() => handleRemove(item, index)}
                    disabled={processing}
                    className="flex items-center justify-center gap-2 rounded-xl border border-red-200 px-3 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-50 disabled:opacity-50 dark:border-red-900 dark:text-red-400 dark:hover:bg-red-950/40"
                  >
                    <Trash2 size={17} />
                    Excluir
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
}

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
    toggleTransactionPaid,
    removeRevenue,
    removeFixedExpense,
  } = useFinancial();

  const { accounts, loading: loadingAccounts } = useAccounts();
  const { categories, loading: loadingCategories } = useCategories();

  const accountsById = useMemo(() => {
    return accounts.reduce((map, account) => {
      map[account.id] = account;
      return map;
    }, {});
  }, [accounts]);

  const categoriesById = useMemo(() => {
    return categories.reduce((map, category) => {
      map[category.id] = category;
      return map;
    }, {});
  }, [categories]);

  const month = monthsData.find(
    (item) => item.nome.toLowerCase() === monthName?.toLowerCase(),
  );

  if (!month) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-100 px-6 transition-colors dark:bg-slate-950">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-zinc-900 dark:text-white">
            Mês não encontrado
          </h1>

          <Link
            to="/"
            className="mt-5 inline-flex text-indigo-600 hover:underline dark:text-indigo-400"
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

  async function handleSaveRevenue(revenue) {
    if (revenueModal.editingIndex !== null) {
      await updateRevenue(month.nome, revenueModal.editingIndex, revenue);
    } else {
      await addRevenue(revenue);
    }

    closeRevenueModal();
  }

  async function handleSaveExpense(expense) {
    if (expenseModal.editingIndex !== null) {
      await updateFixedExpense(month.nome, expenseModal.editingIndex, expense);
    } else {
      await addFixedExpense(expense);
    }

    closeExpenseModal();
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-100 via-stone-50 to-zinc-200 px-6 py-8 transition-colors dark:from-slate-950 dark:via-slate-950 dark:to-slate-900">
      <main className="mx-auto max-w-6xl">
        <Link
          to="/"
          className="mb-8 inline-flex items-center gap-2 text-zinc-600 transition hover:text-zinc-900 hover:underline dark:text-slate-400 dark:hover:text-white"
        >
          <ArrowLeft size={18} />
          Voltar
        </Link>

        <h1 className="text-5xl font-bold text-zinc-900 dark:text-white">
          {month.nome}
        </h1>

        <p className="mt-3 text-lg text-zinc-500 dark:text-slate-400">
          Acompanhe as receitas e despesas previstas para este mês.
        </p>

        <MonthSummaryCard
          balance={balance}
          totalRevenue={totalRevenue}
          totalExpenses={totalExpenses}
        />

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
          <TransactionSection
            title="Receitas"
            type="income"
            items={month.receitas}
            accountsById={accountsById}
            categoriesById={categoriesById}
            loadingAccounts={loadingAccounts}
            loadingCategories={loadingCategories}
            onEdit={(index) =>
              setRevenueModal({
                open: true,
                editingIndex: index,
              })
            }
            onRemove={(index) => removeRevenue(month.nome, index)}
            onTogglePaid={toggleTransactionPaid}
          />

          <TransactionSection
            title="Despesas"
            type="expense"
            items={month.despesasFixas}
            accountsById={accountsById}
            categoriesById={categoriesById}
            loadingAccounts={loadingAccounts}
            loadingCategories={loadingCategories}
            onEdit={(index) =>
              setExpenseModal({
                open: true,
                editingIndex: index,
              })
            }
            onRemove={(index) => removeFixedExpense(month.nome, index)}
            onTogglePaid={toggleTransactionPaid}
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
