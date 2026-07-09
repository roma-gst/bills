import { useState } from "react";
import {
  Moon,
  Plus,
  User,
  Wallet,
  DollarSign,
  ReceiptText,
} from "lucide-react";

function HomeHeader({ onAddRevenue, onAddFixedExpense }) {
  const [open, setOpen] = useState(false);

  return (
    <header className="mb-10 rounded-3xl border border-zinc-200 bg-white px-6 py-5 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-600 text-white">
            <Wallet size={22} />
          </div>

          <h1 className="text-xl font-bold text-zinc-900">NiggaBills</h1>
        </div>

        <div className="relative flex items-center gap-3">
          <button
            onClick={() => setOpen(!open)}
            className="flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 font-semibold text-white shadow-sm transition hover:bg-indigo-700"
          >
            <Plus size={18} />
            Novo
          </button>

          <button className="rounded-xl border border-zinc-200 p-3 text-zinc-700 transition hover:bg-zinc-100">
            <Moon size={20} />
          </button>

          <button className="rounded-xl border border-zinc-200 p-3 text-zinc-700 transition hover:bg-zinc-100">
            <User size={20} />
          </button>

          {open && (
            <div className="absolute right-20 top-14 z-20 w-56 rounded-2xl border border-zinc-200 bg-white p-3 shadow-xl">
              <button
                onClick={onAddRevenue}
                className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left font-medium text-zinc-700 hover:bg-zinc-100"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100 text-green-600">
                  <DollarSign size={16} />
                </span>
                Receita
              </button>

              <button
                onClick={onAddFixedExpense}
                className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left font-medium text-zinc-700 hover:bg-zinc-100"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-red-100 text-red-600">
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
