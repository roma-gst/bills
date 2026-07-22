import { useEffect, useState } from "react";

const ICON_OPTIONS = [
  "🏷️",
  "💰",
  "💼",
  "🍔",
  "🏠",
  "🚗",
  "🎮",
  "💊",
  "📚",
  "🛒",
  "📱",
  "✈️",
  "🎁",
  "💡",
  "📦",
];

const DEFAULT_VALUES = {
  name: "",
  color: "#4f46e5",
  icon: "🏷️",
};

function CategoryForm({ initialValues, onSave, onCancel }) {
  const [values, setValues] = useState(DEFAULT_VALUES);
  const [saving, setSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    setValues({
      name: initialValues?.name ?? "",
      color: initialValues?.color ?? "#4f46e5",
      icon: initialValues?.icon ?? "🏷️",
    });
  }, [initialValues]);

  function handleChange(event) {
    const { name, value } = event.target;

    setValues((current) => ({
      ...current,
      [name]: value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const name = values.name.trim();

    if (!name) {
      setErrorMessage("Informe o nome da categoria.");
      return;
    }

    try {
      setSaving(true);
      setErrorMessage("");

      await onSave({
        name,
        color: values.color,
        icon: values.icon,
      });
    } catch (error) {
      console.error(error);

      setErrorMessage(error.message || "Não foi possível salvar a categoria.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {errorMessage && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-900 dark:bg-red-950/40 dark:text-red-300">
          {errorMessage}
        </div>
      )}

      <div>
        <label
          htmlFor="category-name"
          className="mb-2 block text-sm font-semibold text-zinc-700 dark:text-slate-200"
        >
          Nome
        </label>

        <input
          id="category-name"
          name="name"
          type="text"
          value={values.name}
          onChange={handleChange}
          placeholder="Ex.: Alimentação"
          autoFocus
          className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 text-zinc-900 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
        />
      </div>

      <div>
        <label
          htmlFor="category-icon"
          className="mb-2 block text-sm font-semibold text-zinc-700 dark:text-slate-200"
        >
          Ícone
        </label>

        <select
          id="category-icon"
          name="icon"
          value={values.icon}
          onChange={handleChange}
          className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 text-zinc-900 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
        >
          {ICON_OPTIONS.map((icon) => (
            <option key={icon} value={icon}>
              {icon}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label
          htmlFor="category-color"
          className="mb-2 block text-sm font-semibold text-zinc-700 dark:text-slate-200"
        >
          Cor
        </label>

        <div className="flex items-center gap-3">
          <input
            id="category-color"
            name="color"
            type="color"
            value={values.color}
            onChange={handleChange}
            className="h-12 w-16 cursor-pointer rounded-xl border border-zinc-300 bg-white p-1 dark:border-slate-700 dark:bg-slate-900"
          />

          <input
            name="color"
            type="text"
            value={values.color}
            onChange={handleChange}
            className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 text-zinc-900 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
          />
        </div>
      </div>

      <div className="flex gap-3 pt-2">
        <button
          type="button"
          onClick={onCancel}
          disabled={saving}
          className="flex-1 rounded-xl border border-zinc-300 px-4 py-3 font-semibold text-zinc-700 transition hover:bg-zinc-100 disabled:cursor-not-allowed disabled:opacity-60 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
        >
          Cancelar
        </button>

        <button
          type="submit"
          disabled={saving}
          className="flex-1 rounded-xl bg-indigo-600 px-4 py-3 font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {saving ? "Salvando..." : "Salvar"}
        </button>
      </div>
    </form>
  );
}

export default CategoryForm;
