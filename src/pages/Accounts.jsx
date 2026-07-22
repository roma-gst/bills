import { useMemo, useState } from "react";
import { Pencil, Plus, Trash2 } from "lucide-react";

import useAccounts from "../hooks/useAccounts";
import { useFinancial } from "../context/FinancialContext";

import Modal from "../components/ui/Modal";
import AccountForm from "../components/accounts/AccountForm";

function formatCurrency(value) {
  return Number(value || 0).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

function Accounts() {
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(null);

  const {
    accounts,
    loading: accountsLoading,
    errorMessage: accountsError,
    addAccount,
    editAccount,
    removeAccount,
  } = useAccounts();

  const {
    transactions,
    loading: transactionsLoading,
    errorMessage: transactionsError,
  } = useFinancial();

  const accountsSummary = useMemo(() => {
    const summary = {};

    for (const account of accounts) {
      summary[account.id] = {
        income: 0,
        expense: 0,
        pendingIncome: 0,
        pendingExpense: 0,
      };
    }

    for (const transaction of transactions) {
      if (!transaction.account_id) {
        continue;
      }

      if (!summary[transaction.account_id]) {
        summary[transaction.account_id] = {
          income: 0,
          expense: 0,
          pendingIncome: 0,
          pendingExpense: 0,
        };
      }

      const amount = Number(transaction.amount) || 0;
      const accountSummary = summary[transaction.account_id];

      if (transaction.paid) {
        if (transaction.type === "income") {
          accountSummary.income += amount;
        }

        if (transaction.type === "expense") {
          accountSummary.expense += amount;
        }

        continue;
      }

      if (transaction.type === "income") {
        accountSummary.pendingIncome += amount;
      }

      if (transaction.type === "expense") {
        accountSummary.pendingExpense += amount;
      }
    }

    return summary;
  }, [accounts, transactions]);

  async function handleSaveAccount(account) {
    try {
      if (editing) {
        await editAccount(editing.id, account);
      } else {
        await addAccount(account);
      }

      closeModal();
    } catch (error) {
      console.error(error);
    }
  }

  function closeModal() {
    setEditing(null);
    setOpen(false);
  }

  async function handleDeleteAccount(accountId) {
    const confirmed = window.confirm(
      "Deseja excluir esta conta? Essa ação não poderá ser desfeita.",
    );

    if (!confirmed) {
      return;
    }

    try {
      await removeAccount(accountId);
    } catch (error) {
      console.error(error);
    }
  }

  const loading = accountsLoading || transactionsLoading;
  const errorMessage = accountsError || transactionsError;

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-100 transition-colors dark:bg-slate-950">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-indigo-600/20 border-t-indigo-600 dark:border-white/20 dark:border-t-white" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-100 via-stone-50 to-zinc-200 px-6 py-8 transition-colors dark:from-slate-950 dark:via-slate-950 dark:to-slate-900">
      <main className="mx-auto max-w-6xl">
        <div className="mb-8 flex items-center justify-between gap-4">
          <div>
            <h1 className="text-4xl font-bold text-zinc-900 dark:text-white">
              Contas
            </h1>

            <p className="mt-2 text-zinc-500 dark:text-slate-400">
              O saldo atual considera apenas lançamentos confirmados.
            </p>
          </div>

          <button
            type="button"
            onClick={() => {
              setEditing(null);
              setOpen(true);
            }}
            className="flex shrink-0 items-center gap-2 rounded-2xl bg-indigo-600 px-5 py-3 font-semibold text-white transition hover:-translate-y-0.5 hover:bg-indigo-700"
          >
            <Plus size={20} />
            Nova conta
          </button>
        </div>

        {errorMessage && (
          <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-900 dark:bg-red-950/40 dark:text-red-300">
            {errorMessage}
          </div>
        )}

        {accounts.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-zinc-300 p-12 text-center dark:border-slate-700">
            <h2 className="text-xl font-semibold text-zinc-900 dark:text-white">
              Nenhuma conta cadastrada
            </h2>

            <p className="mt-2 text-zinc-500 dark:text-slate-400">
              Clique em “Nova conta” para começar.
            </p>
          </div>
        ) : (
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {accounts.map((account) => {
              const accountSummary = accountsSummary[account.id] ?? {
                income: 0,
                expense: 0,
                pendingIncome: 0,
                pendingExpense: 0,
              };

              const initialBalance = Number(account.balance) || 0;

              const currentBalance =
                initialBalance + accountSummary.income - accountSummary.expense;

              const projectedBalance =
                currentBalance +
                accountSummary.pendingIncome -
                accountSummary.pendingExpense;

              return (
                <article
                  key={account.id}
                  className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg dark:border-slate-700 dark:bg-slate-900"
                >
                  <div className="mb-5 flex items-center gap-3">
                    <div
                      className="h-5 w-5 shrink-0 rounded-full"
                      style={{
                        backgroundColor: account.color || "#4f46e5",
                      }}
                    />

                    <div className="min-w-0">
                      <h2 className="truncate text-xl font-bold text-zinc-900 dark:text-white">
                        {account.name}
                      </h2>

                      <p className="text-sm capitalize text-zinc-500 dark:text-slate-400">
                        {account.type}
                      </p>
                    </div>
                  </div>

                  <div>
                    <p className="text-sm font-medium text-zinc-500 dark:text-slate-400">
                      Saldo atual
                    </p>

                    <h3
                      className={`mt-1 break-words text-3xl font-bold ${
                        currentBalance < 0
                          ? "text-red-600 dark:text-red-400"
                          : "text-indigo-600 dark:text-indigo-400"
                      }`}
                    >
                      {formatCurrency(currentBalance)}
                    </h3>
                  </div>

                  <div className="mt-6 space-y-3 rounded-2xl bg-zinc-50 p-4 dark:bg-slate-800/70">
                    <div className="flex items-center justify-between gap-3 text-sm">
                      <span className="text-zinc-500 dark:text-slate-400">
                        Saldo inicial
                      </span>

                      <span className="font-semibold text-zinc-800 dark:text-slate-200">
                        {formatCurrency(initialBalance)}
                      </span>
                    </div>

                    <div className="flex items-center justify-between gap-3 text-sm">
                      <span className="text-zinc-500 dark:text-slate-400">
                        Recebidas
                      </span>

                      <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                        + {formatCurrency(accountSummary.income)}
                      </span>
                    </div>

                    <div className="flex items-center justify-between gap-3 text-sm">
                      <span className="text-zinc-500 dark:text-slate-400">
                        Pagas
                      </span>

                      <span className="font-semibold text-red-600 dark:text-red-400">
                        - {formatCurrency(accountSummary.expense)}
                      </span>
                    </div>

                    <div className="border-t border-zinc-200 pt-3 dark:border-slate-700">
                      <div className="flex items-center justify-between gap-3 text-sm">
                        <span className="text-zinc-500 dark:text-slate-400">
                          Saldo previsto
                        </span>

                        <span
                          className={`font-bold ${
                            projectedBalance < 0
                              ? "text-red-600 dark:text-red-400"
                              : "text-zinc-800 dark:text-slate-200"
                          }`}
                        >
                          {formatCurrency(projectedBalance)}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 flex gap-3">
                    <button
                      type="button"
                      onClick={() => {
                        setEditing(account);
                        setOpen(true);
                      }}
                      className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-zinc-200 px-3 py-2 text-zinc-700 transition hover:bg-zinc-100 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
                    >
                      <Pencil size={16} />
                      Editar
                    </button>

                    <button
                      type="button"
                      onClick={() => handleDeleteAccount(account.id)}
                      className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-red-300 px-3 py-2 text-red-600 transition hover:bg-red-50 dark:border-red-800 dark:text-red-400 dark:hover:bg-red-900/20"
                    >
                      <Trash2 size={16} />
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
            title={editing ? "Editar conta" : "Nova conta"}
            onClose={closeModal}
          >
            <AccountForm
              initialValues={editing}
              onCancel={closeModal}
              onSave={handleSaveAccount}
            />
          </Modal>
        )}
      </main>
    </div>
  );
}

export default Accounts;
