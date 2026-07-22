import { useMemo, useState } from "react";
import {
  ArrowLeft,
  CalendarDays,
  Pause,
  Pencil,
  Play,
  Plus,
  Trash2,
  TrendingDown,
  TrendingUp,
} from "lucide-react";
import { Link } from "react-router-dom";

import useAccounts from "../hooks/useAccounts";
import useCategories from "../hooks/useCategories";
import useRecurringTransactions from "../hooks/useRecurringTransactions";
import { useFinancial } from "../context/FinancialContext";

import Modal from "../components/ui/Modal";
import RecurringTransactionForm from "../components/recurring/RecurringTransactionForm";

function formatCurrency(value) {
  return Number(value || 0).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

function formatDate(value) {
  if (!value) {
    return "Sem data final";
  }

  return new Intl.DateTimeFormat("pt-BR", {
    timeZone: "UTC",
  }).format(new Date(`${value}T00:00:00Z`));
}

function RecurringTransactions() {
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [processingId, setProcessingId] = useState(null);

  const { accounts, loading: loadingAccounts } = useAccounts();
  const { categories, loading: loadingCategories } = useCategories();

  const { reloadTransactions } = useFinancial();

  const {
    recurringTransactions,
    loading,
    errorMessage,
    addRecurringTransaction,
    editRecurringTransaction,
    toggleRecurringTransaction,
    removeRecurringTransaction,
  } = useRecurringTransactions();

  const accountsById = useMemo(() => {
    return accounts.reduce((result, account) => {
      result[account.id] = account;
      return result;
    }, {});
  }, [accounts]);

  const categoriesById = useMemo(() => {
    return categories.reduce((result, category) => {
      result[category.id] = category;
      return result;
    }, {});
  }, [categories]);

  function openCreateModal() {
    setEditing(null);
    setOpen(true);
  }

  function openEditModal(item) {
    setEditing(item);
    setOpen(true);
  }

  function closeModal() {
    setEditing(null);
    setOpen(false);
  }

  async function handleSave(values) {
    if (editing) {
      await editRecurringTransaction(editing.id, values);
    } else {
      await addRecurringTransaction(values);
    }

    await reloadTransactions();
    closeModal();
  }

  async function handleToggle(item) {
    try {
      setProcessingId(item.id);

      await toggleRecurringTransaction(item);
      await reloadTransactions();
    } catch (error) {
      console.error(error);
    } finally {
      setProcessingId(null);
    }
  }

  async function handleDelete(item) {
    const confirmed = window.confirm(
      `Deseja excluir a recorrência "${item.description}"? Os lançamentos futuros não pagos também serão removidos.`,
    );

    if (!confirmed) {
      return;
    }

    try {
      setProcessingId(item.id);

      await removeRecurringTransaction(item.id);
      await reloadTransactions();
    } catch (error) {
      console.error(error);
    } finally {
      setProcessingId(null);
    }
  }

  const pageLoading = loading || loadingAccounts || loadingCategories;

  if (pageLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-100 dark:bg-slate-950">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-indigo-600/20 border-t-indigo-600 dark:border-white/20 dark:border-t-white" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-100 via-stone-50 to-zinc-200 px-6 py-8 dark:from-slate-950 dark:via-slate-950 dark:to-slate-900">
      <main className="mx-auto max-w-6xl">
        <Link
          to="/"
          className="mb-8 inline-flex items-center gap-2 text-zinc-600 transition hover:text-zinc-900 dark:text-slate-400 dark:hover:text-white"
        >
          <ArrowLeft size={18} />
          Voltar
        </Link>

        <header className="mb-8 flex items-center justify-between gap-4">
          <div>
            <h1 className="text-4xl font-bold text-zinc-900 dark:text-white">
              Recorrências
            </h1>

            <p className="mt-2 text-zinc-500 dark:text-slate-400">
              Automatize salários, assinaturas e contas mensais.
            </p>
          </div>

          <button
            type="button"
            onClick={openCreateModal}
            className="flex shrink-0 items-center gap-2 rounded-2xl bg-indigo-600 px-5 py-3 font-semibold text-white transition hover:-translate-y-0.5 hover:bg-indigo-700"
          >
            <Plus size={20} />
            Nova recorrência
          </button>
        </header>

        {errorMessage && (
          <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-red-700 dark:border-red-900 dark:bg-red-950/40 dark:text-red-300">
            {errorMessage}
          </div>
        )}

        {recurringTransactions.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-zinc-300 p-12 text-center dark:border-slate-700">
            <h2 className="text-xl font-semibold text-zinc-900 dark:text-white">
              Nenhuma recorrência cadastrada
            </h2>

            <p className="mt-2 text-zinc-500 dark:text-slate-400">
              Crie uma recorrência para gerar lançamentos mensais.
            </p>
          </div>
        ) : (
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {recurringTransactions.map((item) => {
              const account = accountsById[item.account_id];
              const category = categoriesById[item.category_id];
              const isIncome = item.type === "income";
              const processing = processingId === item.id;

              return (
                <article
                  key={item.id}
                  className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div
                      className={`flex h-12 w-12 items-center justify-center rounded-2xl ${
                        isIncome
                          ? "bg-emerald-100 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400"
                          : "bg-red-100 text-red-600 dark:bg-red-500/10 dark:text-red-400"
                      }`}
                    >
                      {isIncome ? (
                        <TrendingUp size={24} />
                      ) : (
                        <TrendingDown size={24} />
                      )}
                    </div>

                    <span
                      className={`rounded-full px-3 py-1 text-xs font-bold ${
                        item.active
                          ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400"
                          : "bg-zinc-200 text-zinc-600 dark:bg-slate-800 dark:text-slate-400"
                      }`}
                    >
                      {item.active ? "Ativa" : "Pausada"}
                    </span>
                  </div>

                  <h2 className="mt-5 text-xl font-bold text-zinc-900 dark:text-white">
                    {item.description}
                  </h2>

                  <p
                    className={`mt-2 text-3xl font-bold ${
                      isIncome
                        ? "text-emerald-600 dark:text-emerald-400"
                        : "text-red-600 dark:text-red-400"
                    }`}
                  >
                    {formatCurrency(item.amount)}
                  </p>

                  <div className="mt-5 space-y-3 rounded-2xl bg-zinc-50 p-4 text-sm dark:bg-slate-800/70">
                    <div className="flex justify-between gap-3">
                      <span className="text-zinc-500 dark:text-slate-400">
                        Conta
                      </span>

                      <span className="font-semibold text-zinc-800 dark:text-slate-200">
                        {account?.name || "Conta não encontrada"}
                      </span>
                    </div>

                    <div className="flex justify-between gap-3">
                      <span className="text-zinc-500 dark:text-slate-400">
                        Categoria
                      </span>

                      <span className="font-semibold text-zinc-800 dark:text-slate-200">
                        {category
                          ? `${category.icon || "🏷️"} ${category.name}`
                          : "Sem categoria"}
                      </span>
                    </div>

                    <div className="flex justify-between gap-3">
                      <span className="text-zinc-500 dark:text-slate-400">
                        Vencimento
                      </span>

                      <span className="flex items-center gap-1 font-semibold text-zinc-800 dark:text-slate-200">
                        <CalendarDays size={15} />
                        Dia {item.day_of_month}
                      </span>
                    </div>

                    <div className="flex justify-between gap-3">
                      <span className="text-zinc-500 dark:text-slate-400">
                        Início
                      </span>

                      <span className="font-semibold text-zinc-800 dark:text-slate-200">
                        {formatDate(item.start_date)}
                      </span>
                    </div>

                    <div className="flex justify-between gap-3">
                      <span className="text-zinc-500 dark:text-slate-400">
                        Término
                      </span>

                      <span className="font-semibold text-zinc-800 dark:text-slate-200">
                        {formatDate(item.end_date)}
                      </span>
                    </div>
                  </div>

                  <div className="mt-6 grid grid-cols-3 gap-2">
                    <button
                      type="button"
                      onClick={() => openEditModal(item)}
                      disabled={processing}
                      className="flex items-center justify-center gap-1 rounded-xl border border-zinc-200 px-2 py-2 text-sm font-semibold text-zinc-700 transition hover:bg-zinc-100 disabled:opacity-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
                    >
                      <Pencil size={15} />
                      Editar
                    </button>

                    <button
                      type="button"
                      onClick={() => handleToggle(item)}
                      disabled={processing}
                      className="flex items-center justify-center gap-1 rounded-xl border border-amber-300 px-2 py-2 text-sm font-semibold text-amber-700 transition hover:bg-amber-50 disabled:opacity-50 dark:border-amber-800 dark:text-amber-400 dark:hover:bg-amber-950/30"
                    >
                      {item.active ? <Pause size={15} /> : <Play size={15} />}
                      {item.active ? "Pausar" : "Ativar"}
                    </button>

                    <button
                      type="button"
                      onClick={() => handleDelete(item)}
                      disabled={processing}
                      className="flex items-center justify-center gap-1 rounded-xl border border-red-300 px-2 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-50 disabled:opacity-50 dark:border-red-800 dark:text-red-400 dark:hover:bg-red-950/30"
                    >
                      <Trash2 size={15} />
                      Excluir
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        )}

        {open && (
          <Modal
            title={editing ? "Editar recorrência" : "Nova recorrência"}
            onClose={closeModal}
          >
            <RecurringTransactionForm
              initialValues={editing}
              onSave={handleSave}
              onCancel={closeModal}
            />
          </Modal>
        )}
      </main>
    </div>
  );
}

export default RecurringTransactions;
