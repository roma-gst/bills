import { useState } from "react";

const TYPES = [
  "Conta Corrente",
  "Carteira",
  "Cartão",
  "Vale Alimentação",
  "Vale Refeição",
  "Investimento",
  "Outro",
];

function AccountForm({ onSave, onCancel, initialValues = null }) {
  const [name, setName] = useState(initialValues?.name ?? "");
  const [type, setType] = useState(initialValues?.type ?? TYPES[0]);
  const [color, setColor] = useState(initialValues?.color ?? "#4f46e5");
  const [balance, setBalance] = useState(initialValues?.balance ?? "");
  function handleSubmit(e) {
    e.preventDefault();

    if (!name.trim()) return;

    onSave({
      name: name.trim(),
      type,
      color,
      balance: Number(balance) || 0,
    });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label className="mb-2 block font-medium">Nome</label>

        <input
          className="w-full rounded-2xl border border-zinc-300 px-4 py-3 dark:border-slate-700 dark:bg-slate-800"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div>
        <label className="mb-2 block font-medium">Tipo</label>

        <select
          className="w-full rounded-2xl border border-zinc-300 px-4 py-3 dark:border-slate-700 dark:bg-slate-800"
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          {TYPES.map((item) => (
            <option key={item}>{item}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="mb-2 block font-medium">Cor</label>

        <input
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
        />
      </div>

      <div>
        <label className="mb-2 block font-medium">Saldo inicial</label>

        <input
          type="number"
          step="0.01"
          className="w-full rounded-2xl border border-zinc-300 px-4 py-3 dark:border-slate-700 dark:bg-slate-800"
          value={balance}
          onChange={(e) => setBalance(e.target.value)}
        />
      </div>

      <div className="flex justify-end gap-3">
        <button
          type="button"
          onClick={onCancel}
          className="rounded-2xl border px-5 py-3"
        >
          Cancelar
        </button>

        <button
          type="submit"
          className="rounded-2xl bg-indigo-600 px-5 py-3 text-white"
        >
          Salvar
        </button>
      </div>
    </form>
  );
}

export default AccountForm;
