import { useState } from "react";
import { CalendarDays, FileText, Save, DollarSign } from "lucide-react";
import Button from "../ui/Button";

function TransactionForm({
  buttonText,
  months,
  onSave,
  onCancel,
  showMonthSelect = true,
  defaultMonth = "Janeiro",
}) {
  const [description, setDescription] = useState("");
  const [value, setValue] = useState("");
  const [month, setMonth] = useState(defaultMonth);

  function handleSubmit() {
    if (!description.trim() || !value) return;

    onSave({
      description,
      value,
      month,
    });

    setDescription("");
    setValue("");
    setMonth(defaultMonth);
  }

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-4 rounded-2xl border border-zinc-200 px-5 py-4 focus-within:border-blue-500">
        <FileText className="text-blue-600" size={24} />

        <input
          type="text"
          placeholder="Descrição"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full bg-transparent text-lg outline-none placeholder:text-zinc-400"
        />
      </div>

      <div className="flex items-center gap-4 rounded-2xl border border-zinc-200 px-5 py-4 focus-within:border-blue-500">
        <DollarSign className="text-blue-600" size={24} />

        <input
          type="number"
          placeholder="Valor"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="w-full bg-transparent text-lg outline-none placeholder:text-zinc-400"
        />
      </div>

      {showMonthSelect && (
        <div className="flex items-center gap-4 rounded-2xl border border-zinc-200 px-5 py-4 focus-within:border-blue-500">
          <CalendarDays className="text-blue-600" size={24} />

          <select
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            className="w-full bg-transparent text-lg font-medium outline-none"
          >
            {months.map((item) => (
              <option key={item.nome} value={item.nome}>
                {item.nome}
              </option>
            ))}
          </select>
        </div>
      )}

      <div className="flex items-center justify-between pt-6">
        {onCancel && (
          <button
            onClick={onCancel}
            className="rounded-2xl border border-zinc-200 px-8 py-4 text-lg font-semibold text-slate-600 transition hover:bg-zinc-100"
          >
            Cancelar
          </button>
        )}

        <Button onClick={handleSubmit}>
          <span className="flex items-center gap-3">
            <Save size={22} />
            {buttonText}
          </span>
        </Button>
      </div>
    </div>
  );
}

export default TransactionForm;
