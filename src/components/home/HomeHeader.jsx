import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  CircleDollarSign,
  DollarSign,
  LogOut,
  Moon,
  Plus,
  ReceiptText,
  Sun,
  User,
} from "lucide-react";

import useAuth from "../../hooks/useAuth";
import useTheme from "../../hooks/useTheme";

function HomeHeader({ onAddRevenue, onAddFixedExpense }) {
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();

  const { user, signOut } = useAuth();
  const { isDark, toggleTheme } = useTheme();

  async function handleSignOut() {
    await signOut();
  }

  function handleRevenue() {
    setOpen(false);
    onAddRevenue();
  }

  function handleExpense() {
    setOpen(false);
    onAddFixedExpense();
  }

  return (
    <header className="mb-10 rounded-3xl border border-zinc-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-6 py-5 shadow-sm transition-all duration-200 transition-colors dark:border-slate-700 dark:bg-slate-900">
      <div className="flex items-center justify-between gap-4">
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-indigo-600 text-white">
            <CircleDollarSign size={23} />
          </div>

          <div className="min-w-0">
            <h1 className="font-bold text-zinc-900 dark:text-white dark:text-white dark:text-white">
              Bora Bills
            </h1>

            <p className="truncate text-sm text-zinc-500 dark:text-slate-400 dark:text-slate-400">
              {user?.email}
            </p>
          </div>
        </div>

        <div className="relative flex items-center gap-2">
          <button
            type="button"
            onClick={() => setOpen((current) => !current)}
            className="flex cursor-pointer items-center gap-2 rounded-xl bg-indigo-600 px-4 py-3 font-semibold text-white shadow-sm transition-all duration-200 transition hover:-translate-y-0.5 hover:-translate-y-0.5 hover:bg-indigo-700"
          >
            <Plus size={18} />
            <span className="hidden sm:inline">Novo</span>
          </button>

          <button
            type="button"
            onClick={toggleTheme}
            aria-label={isDark ? "Ativar modo claro" : "Ativar modo escuro"}
            title={isDark ? "Ativar modo claro" : "Ativar modo escuro"}
            className="cursor-pointer rounded-xl border border-zinc-200 dark:border-slate-700 p-3 text-zinc-700 transition hover:-translate-y-0.5 hover:bg-zinc-100 dark:bg-slate-800 dark:hover:bg-slate-800 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
          >
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          <button
            type="button"
            onClick={() => navigate("/profile")}
            aria-label="Abrir perfil"
            title="Perfil"
            className="cursor-pointer rounded-xl border border-zinc-200 dark:border-slate-700 p-3 text-zinc-700 transition hover:-translate-y-0.5 hover:bg-zinc-100 dark:bg-slate-800 dark:hover:bg-slate-800 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
          >
            <User size={20} />
          </button>

          <button
            type="button"
            onClick={handleSignOut}
            aria-label="Sair"
            title="Sair"
            className="cursor-pointer rounded-xl border border-zinc-200 dark:border-slate-700 p-3 text-zinc-700 transition hover:-translate-y-0.5 hover:border-red-200 hover:bg-red-50 hover:text-red-600 dark:border-slate-700 dark:text-slate-200 dark:hover:border-red-500/30 dark:hover:bg-red-500/10 dark:hover:text-red-400"
          >
            <LogOut size={20} />
          </button>

          {open && (
            <div className="absolute right-0 top-14 z-30 w-56 rounded-2xl border border-zinc-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-3 shadow-xl dark:border-slate-700 dark:bg-slate-900">
              <button
                type="button"
                onClick={handleRevenue}
                className="flex w-full cursor-pointer items-center gap-3 rounded-xl px-3 py-3 text-left font-medium text-zinc-700 transition hover:bg-zinc-100 dark:bg-slate-800 dark:hover:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-800"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-500/15 dark:text-emerald-400">
                  <DollarSign size={16} />
                </span>
                Receita
              </button>

              <button
                type="button"
                onClick={handleExpense}
                className="flex w-full cursor-pointer items-center gap-3 rounded-xl px-3 py-3 text-left font-medium text-zinc-700 transition hover:bg-zinc-100 dark:bg-slate-800 dark:hover:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-800"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-red-100 text-red-600 dark:bg-red-500/15 dark:text-red-400">
                  <ReceiptText size={16} />
                </span>
                Despesa
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default HomeHeader;
