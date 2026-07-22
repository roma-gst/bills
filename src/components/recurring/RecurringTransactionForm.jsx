import { useEffect, useState } from "react";
import {
  CalendarDays,
  DollarSign,
  FileText,
  Repeat2,
  Save,
  Tag,
  Wallet,
} from "lucide-react";

import useAccounts from "../../hooks/useAccounts";
import useCategories from "../../hooks/useCategories";

function getToday() {
  const date = new Date();

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

const DEFAULT_VALUES = {
  description: "",
  amount: "",
  type: "expense",
  accountId: "",
  categoryId: "",
  dayOfMonth: "1",
  startDate: getToday(),
  endDate: "",
  active: true,
};

function RecurringTransactionForm({ initialValues = null, onSave, onCancel }) {
  const { accounts, loading: loadingAccounts } = useAccounts();
  const { categories, loading: loadingCategories } = useCategories();

  const [values, setValues] = useState(DEFAULT_VALUES);
  const [saving, setSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    setValues({
      description: initialValues?.description ?? "",
      amount: initialValues?.amount?.toString() ?? "",
      type: initialValues?.type ?? "expense",
      accountId: initialValues?.account_id ?? "",
      categoryId: initialValues?.category_id ?? "",
      dayOfMonth: initialValues?.day_of_month?.toString() ?? "1",
      startDate: initialValues?.start_date ?? getToday(),
      endDate: initialValues?.end_date ?? "",
      active: initialValues?.active ?? true,
    });
  }, [initialValues]);

  useEffect(() => {
    if (!values.accountId && accounts.length > 0) {
      setValues((current) => ({
        ...current,
        accountId: accounts[0].id,
      }));
    }
  }, [accounts, values.accountId]);

  function handleChange(event) {
    const { name, value, type, checked } = event.target;

    setValues((current) => ({
      ...current,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const amount = Number(values.amount);
    const dayOfMonth = Number(values.dayOfMonth);

    if (!values.description.trim()) {
      setErrorMessage("Informe a descrição.");
      return;
    }

    if (!amount || amount <= 0) {
      setErrorMessage("Informe um valor maior que zero.");
      return;
    }

    if (!values.accountId) {
      setErrorMessage("Selecione uma conta.");
      return;
    }

    if (dayOfMonth < 1 || dayOfMonth > 31) {
      setErrorMessage("O dia deve estar entre 1 e 31.");
      return;
    }

    if (!values.startDate) {
      setErrorMessage("Informe a data inicial.");
      return;
    }

    if (values.endDate && values.endDate < values.startDate) {
      setErrorMessage("A data final não pode ser anterior à data inicial.");
      return;
    }

    try {
      setSaving(true);
      setErrorMessage("");

      await onSave({
        description: values.description.trim(),
        amount,
        type: values.type,
        account_id: values.accountId,
        category_id: values.categoryId || null,
        day_of_month: dayOfMonth,
        start_date: values.startDate,
        end_date: values.endDate || null,
        active: values.active,
      });
    } catch (error) {
      console.error(error);

      setErrorMessage(
        error.message || "Não foi possível salvar a recorrência.",
      );
    } finally {
      setSaving(false);
    }
  }

  const fieldClassName =
    "flex items-center gap-3 rounded-xl border border-zinc-200 bg-white px-4 py-3 transition focus-within:border-indigo-500 focus-within:ring-4 focus-within:ring-indigo-500/10 dark:border-slate-700 dark:bg-slate-800";

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {errorMessage && (
        <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-900 dark:bg-red-950/40 dark:text-red-300">
          {errorMessage}
        </div>
      )}

      <div className={fieldClassName}>
        <Repeat2
          size={23}
          className="shrink-0 text-indigo-600 dark:text-indigo-400"
        />

        <select
          name="type"
          value={values.type}
          onChange={handleChange}
          className="w-full cursor-pointer bg-transparent text-lg text-zinc-900 outline-none dark:text-white"
        >
          <option value="income">Receita recorrente</option>
          <option value="expense">Despesa recorrente</option>
        </select>
      </div>

      <div className={fieldClassName}>
        <FileText
          size={23}
          className="shrink-0 text-indigo-600 dark:text-indigo-400"
        />

        <input
          name="description"
          type="text"
          value={values.description}
          onChange={handleChange}
          placeholder="Ex.: Salário, aluguel ou Spotify"
          autoFocus
          className="w-full bg-transparent text-lg text-zinc-900 outline-none placeholder:text-zinc-400 dark:text-white"
        />
      </div>

      <div className={fieldClassName}>
        <DollarSign
          size={23}
          className="shrink-0 text-indigo-600 dark:text-indigo-400"
        />

        <input
          name="amount"
          type="number"
          min="0.01"
          step="0.01"
          value={values.amount}
          onChange={handleChange}
          placeholder="Valor"
          className="w-full bg-transparent text-lg text-zinc-900 outline-none placeholder:text-zinc-400 dark:text-white"
        />
      </div>

      <div className={fieldClassName}>
        <Wallet
          size={23}
          className="shrink-0 text-indigo-600 dark:text-indigo-400"
        />

        <select
          name="accountId"
          value={values.accountId}
          onChange={handleChange}
          disabled={loadingAccounts || accounts.length === 0}
          className="w-full cursor-pointer bg-transparent text-lg text-zinc-900 outline-none disabled:opacity-60 dark:text-white"
        >
          {loadingAccounts ? (
            <option value="">Carregando contas...</option>
          ) : accounts.length === 0 ? (
            <option value="">Cadastre uma conta primeiro</option>
          ) : (
            accounts.map((account) => (
              <option key={account.id} value={account.id}>
                {account.name}
              </option>
            ))
          )}
        </select>
      </div>

      <div className={fieldClassName}>
        <Tag
          size={23}
          className="shrink-0 text-indigo-600 dark:text-indigo-400"
        />

        <select
          name="categoryId"
          value={values.categoryId}
          onChange={handleChange}
          disabled={loadingCategories}
          className="w-full cursor-pointer bg-transparent text-lg text-zinc-900 outline-none disabled:opacity-60 dark:text-white"
        >
          <option value="">Sem categoria</option>

          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.icon || "🏷️"} {category.name}
            </option>
          ))}
        </select>
      </div>

      <div className={fieldClassName}>
        <CalendarDays
          size={23}
          className="shrink-0 text-indigo-600 dark:text-indigo-400"
        />

        <div className="w-full">
          <label className="text-xs font-semibold uppercase tracking-wide text-zinc-500 dark:text-slate-400">
            Dia do mês
          </label>

          <input
            name="dayOfMonth"
            type="number"
            min="1"
            max="31"
            value={values.dayOfMonth}
            onChange={handleChange}
            className="mt-1 w-full bg-transparent text-lg text-zinc-900 outline-none dark:text-white"
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label
            htmlFor="recurring-start-date"
            className="mb-2 block text-sm font-semibold text-zinc-700 dark:text-slate-200"
          >
            Data inicial
          </label>

          <input
            id="recurring-start-date"
            name="startDate"
            type="date"
            value={values.startDate}
            onChange={handleChange}
            className="w-full rounded-2xl border border-zinc-200 bg-white px-4 py-3 text-zinc-900 outline-none focus:border-indigo-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
          />
        </div>

        <div>
          <label
            htmlFor="recurring-end-date"
            className="mb-2 block text-sm font-semibold text-zinc-700 dark:text-slate-200"
          >
            Data final
          </label>

          <input
            id="recurring-end-date"
            name="endDate"
            type="date"
            value={values.endDate}
            onChange={handleChange}
            min={values.startDate}
            className="w-full rounded-2xl border border-zinc-200 bg-white px-4 py-3 text-zinc-900 outline-none focus:border-indigo-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
          />

          <p className="mt-1 text-xs text-zinc-500 dark:text-slate-400">
            Deixe vazio para não definir um término.
          </p>
        </div>
      </div>

      <label className="flex cursor-pointer items-center justify-between rounded-2xl border border-zinc-200 bg-white px-5 py-4 dark:border-slate-700 dark:bg-slate-800">
        <div>
          <p className="font-semibold text-zinc-900 dark:text-white">
            Recorrência ativa
          </p>

          <p className="text-sm text-zinc-500 dark:text-slate-400">
            Gera automaticamente os lançamentos mensais.
          </p>
        </div>

        <input
          name="active"
          type="checkbox"
          checked={values.active}
          onChange={handleChange}
          className="h-5 w-5 accent-indigo-600"
        />
      </label>

      {accounts.length === 0 && !loadingAccounts && (
        <p className="rounded-2xl bg-amber-50 px-4 py-3 text-sm text-amber-700 dark:bg-amber-500/10 dark:text-amber-300">
          Cadastre uma conta antes de criar uma recorrência.
        </p>
      )}

      <div className="flex flex-col-reverse gap-3 pt-3 sm:flex-row sm:justify-between">
        <button
          type="button"
          onClick={onCancel}
          disabled={saving}
          className="rounded-2xl border border-zinc-300 px-7 py-3.5 font-semibold text-zinc-700 transition hover:bg-zinc-100 disabled:opacity-60 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
        >
          Cancelar
        </button>

        <button
          type="submit"
          disabled={
            saving ||
            loadingAccounts ||
            loadingCategories ||
            accounts.length === 0
          }
          className="flex items-center justify-center gap-3 rounded-2xl bg-indigo-600 px-7 py-3.5 font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Save size={20} />
          {saving ? "Salvando..." : "Salvar recorrência"}
        </button>
      </div>
    </form>
  );
}

export default RecurringTransactionForm;
