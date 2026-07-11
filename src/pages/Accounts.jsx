import { useState } from "react";
import { Pencil, Plus, Trash2 } from "lucide-react";

import useAccounts from "../hooks/useAccounts";
import Modal from "../components/ui/Modal";
import AccountForm from "../components/accounts/AccountForm";

function Accounts() {
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(null);

  const { accounts, loading, addAccount, editAccount, removeAccount } =
    useAccounts();

  async function handleSaveAccount(account) {
    if (editing) {
      await editAccount(editing.id, account);
    } else {
      await addAccount(account);
    }

    closeModal();
  }

  function closeModal() {
    setEditing(null);
    setOpen(false);
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-white/20 border-t-white" />
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
              Gerencie suas contas financeiras.
            </p>
          </div>

          <button
            type="button"
            onClick={() => {
              setEditing(null);
              setOpen(true);
            }}
            className="flex items-center gap-2 rounded-2xl bg-indigo-600 px-5 py-3 font-semibold text-white transition hover:-translate-y-0.5 hover:bg-indigo-700"
          >
            <Plus size={20} />
            Nova conta
          </button>
        </div>

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
            {accounts.map((account) => (
              <article
                key={account.id}
                className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg dark:border-slate-700 dark:bg-slate-900"
              >
                <div className="mb-5 flex items-center gap-3">
                  <div
                    className="h-5 w-5 rounded-full"
                    style={{ backgroundColor: account.color }}
                  />

                  <h2 className="text-xl font-bold text-zinc-900 dark:text-white">
                    {account.name}
                  </h2>
                </div>

                <p className="text-sm text-zinc-500 dark:text-slate-400">
                  {account.type}
                </p>

                <h3 className="mt-6 text-3xl font-bold text-indigo-600 dark:text-indigo-400">
                  {Number(account.balance).toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </h3>

                <div className="mt-6 flex gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setEditing(account);
                      setOpen(true);
                    }}
                    className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-zinc-200 px-3 py-2 transition hover:bg-zinc-100 dark:border-slate-700 dark:hover:bg-slate-800"
                  >
                    <Pencil size={16} />
                    Editar
                  </button>

                  <button
                    type="button"
                    onClick={async () => {
                      const confirmed = window.confirm(
                        "Deseja excluir esta conta?",
                      );

                      if (confirmed) {
                        await removeAccount(account.id);
                      }
                    }}
                    className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-red-300 px-3 py-2 text-red-600 transition hover:bg-red-50 dark:border-red-800 dark:hover:bg-red-900/20"
                  >
                    <Trash2 size={16} />
                    Excluir
                  </button>
                </div>
              </article>
            ))}
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
