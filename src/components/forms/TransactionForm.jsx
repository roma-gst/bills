import { useState } from "react";
import { CalendarDays, FileText, Save, DollarSign } from "lucide-react";

function TransactionForm({
  buttonText,
  months,
  onSave,
  onCancel,
  showMonthSelect = true,
  defaultMonth = "Janeiro",
  initialValues = null,
}) {
  const [description, setDescription] = useState(
    initialValues?.descricao ?? "",
  );

  const [value, setValue] = useState(initialValues?.valor?.toString() ?? "");

  const [month, setMonth] = useState(initialValues?.month ?? defaultMonth);

  function handleSubmit(event) {
    event.preventDefault();

    const numericValue = Number(value);

    if (!description.trim() || !numericValue || numericValue <= 0) {
      return;
    }

    onSave({
      description: description.trim(),
      value: numericValue,
      month,
    });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="flex items-center gap-4 rounded-2xl border border-zinc-200 px-5 py-4 transition focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-500/10">
        <FileText className="shrink-0 text-blue-600" size={23} />

        <input
          type="text"
          placeholder="Descrição"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          className="w-full bg-transparent text-lg text-slate-900 outline-none placeholder:text-zinc-400"
          autoFocus
        />
      </div>

      <div className="flex items-center gap-4 rounded-2xl border border-zinc-200 px-5 py-4 transition focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-500/10">
        <DollarSign className="shrink-0 text-blue-600" size={23} />

        <input
          type="number"
          min="0.01"
          step="0.01"
          placeholder="Valor"
          value={value}
          onChange={(event) => setValue(event.target.value)}
          className="w-full bg-transparent text-lg text-slate-900 outline-none placeholder:text-zinc-400"
        />
      </div>

      {showMonthSelect && (
        <div className="flex items-center gap-4 rounded-2xl border border-zinc-200 px-5 py-4 transition focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-500/10">
          <CalendarDays className="shrink-0 text-blue-600" size={23} />

          <select
            value={month}
            onChange={(event) => setMonth(event.target.value)}
            className="w-full cursor-pointer bg-transparent text-lg font-medium text-slate-900 outline-none"
          >
            {months.map((item) => (
              <option key={item.nome} value={item.nome}>
                {item.nome}
              </option>
            ))}
          </select>
        </div>
      )}

      <div className="flex flex-col-reverse gap-3 pt-5 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="button"
          onClick={onCancel}
          className="rounded-2xl border border-zinc-200 px-7 py-3.5 font-semibold text-slate-600 transition hover:bg-zinc-100"
        >
          Cancelar
        </button>

        <button
          type="submit"
          className="flex items-center justify-center gap-3 rounded-2xl bg-blue-600 px-7 py-3.5 font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700"
        >
          <Save size={20} />
          {buttonText}
        </button>
      </div>
    </form>
  );
}

export default TransactionForm;
