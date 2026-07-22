import { useEffect, useState } from "react";
import {
  CalendarDays,
  DollarSign,
  FileText,
  Save,
  Tag,
  Wallet,
} from "lucide-react";

import useAccounts from "../../hooks/useAccounts";
import useCategories from "../../hooks/useCategories";

function TransactionForm({
  buttonText,
  months,
  onSave,
  onCancel,
  showMonthSelect = true,
  defaultMonth = "Janeiro",
  initialValues = null,
}) {
  const { accounts, loading: loadingAccounts } = useAccounts();

  const { categories, loading: loadingCategories } = useCategories();

  const [description, setDescription] = useState(
    initialValues?.descricao ?? "",
  );

  const [value, setValue] = useState(initialValues?.valor?.toString() ?? "");

  const [month, setMonth] = useState(initialValues?.month ?? defaultMonth);

  const [accountId, setAccountId] = useState(initialValues?.account_id ?? "");

  const [categoryId, setCategoryId] = useState(
    initialValues?.category_id ?? "",
  );

  const [saving, setSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (!accountId && accounts.length > 0) {
      setAccountId(accounts[0].id);
    }
  }, [accounts, accountId]);

  async function handleSubmit(event) {
    event.preventDefault();

    const numericValue = Number(value);

    if (!description.trim()) {
      setErrorMessage("Informe a descrição do lançamento.");
      return;
    }

    if (!numericValue || numericValue <= 0) {
      setErrorMessage("Informe um valor maior que zero.");
      return;
    }

    if (!accountId) {
      setErrorMessage("Selecione uma conta.");
      return;
    }

    try {
      setSaving(true);
      setErrorMessage("");

      await onSave({
        description: description.trim(),
        value: numericValue,
        month,
        accountId,
        categoryId: categoryId || null,
      });
    } catch (error) {
      console.error(error);

      setErrorMessage(error.message || "Não foi possível salvar o lançamento.");
    } finally {
      setSaving(false);
    }
  }

  const fieldClassName =
    "flex items-center gap-4 rounded-2xl border border-zinc-200 bg-white px-5 py-4 transition focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-500/10 dark:border-slate-700 dark:bg-slate-800 dark:focus-within:border-blue-400 dark:focus-within:ring-blue-400/10";

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {errorMessage && (
        <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-900 dark:bg-red-950/40 dark:text-red-300">
          {errorMessage}
        </div>
      )}

      <div className={fieldClassName}>
        <FileText
          className="shrink-0 text-blue-600 dark:text-blue-400"
          size={23}
        />

        <input
          type="text"
          placeholder="Descrição"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          className="w-full bg-transparent text-lg text-slate-900 outline-none placeholder:text-zinc-400 dark:text-white dark:placeholder:text-slate-500"
          autoFocus
        />
      </div>

      <div className={fieldClassName}>
        <DollarSign
          className="shrink-0 text-blue-600 dark:text-blue-400"
          size={23}
        />

        <input
          type="number"
          min="0.01"
          step="0.01"
          placeholder="Valor"
          value={value}
          onChange={(event) => setValue(event.target.value)}
          className="w-full bg-transparent text-lg text-slate-900 outline-none placeholder:text-zinc-400 dark:text-white dark:placeholder:text-slate-500"
        />
      </div>

      <div className={fieldClassName}>
        <Wallet
          className="shrink-0 text-blue-600 dark:text-blue-400"
          size={23}
        />

        <select
          value={accountId}
          onChange={(event) => setAccountId(event.target.value)}
          disabled={loadingAccounts || accounts.length === 0}
          className="w-full cursor-pointer bg-transparent text-lg font-medium text-slate-900 outline-none disabled:cursor-not-allowed disabled:opacity-60 dark:text-white"
        >
          {loadingAccounts ? (
            <option value="">Carregando contas...</option>
          ) : accounts.length === 0 ? (
            <option value="">Cadastre uma conta primeiro</option>
          ) : (
            accounts.map((account) => (
              <option
                key={account.id}
                value={account.id}
                className="bg-white text-slate-900 dark:bg-slate-800 dark:text-white"
              >
                {account.name}
              </option>
            ))
          )}
        </select>
      </div>

      <div className={fieldClassName}>
        <Tag className="shrink-0 text-blue-600 dark:text-blue-400" size={23} />

        <select
          value={categoryId}
          onChange={(event) => setCategoryId(event.target.value)}
          disabled={loadingCategories}
          className="w-full cursor-pointer bg-transparent text-lg font-medium text-slate-900 outline-none disabled:cursor-not-allowed disabled:opacity-60 dark:text-white"
        >
          {loadingCategories ? (
            <option value="">Carregando categorias...</option>
          ) : (
            <>
              <option
                value=""
                className="bg-white text-slate-900 dark:bg-slate-800 dark:text-white"
              >
                Sem categoria
              </option>

              {categories.map((category) => (
                <option
                  key={category.id}
                  value={category.id}
                  className="bg-white text-slate-900 dark:bg-slate-800 dark:text-white"
                >
                  {category.icon || "🏷️"} {category.name}
                </option>
              ))}
            </>
          )}
        </select>
      </div>

      {showMonthSelect && (
        <div className={fieldClassName}>
          <CalendarDays
            className="shrink-0 text-blue-600 dark:text-blue-400"
            size={23}
          />

          <select
            value={month}
            onChange={(event) => setMonth(event.target.value)}
            className="w-full cursor-pointer bg-transparent text-lg font-medium text-slate-900 outline-none dark:text-white"
          >
            {months.map((item) => (
              <option
                key={item.nome}
                value={item.nome}
                className="bg-white text-slate-900 dark:bg-slate-800 dark:text-white"
              >
                {item.nome}
              </option>
            ))}
          </select>
        </div>
      )}

      {accounts.length === 0 && !loadingAccounts && (
        <p className="rounded-2xl bg-amber-50 px-4 py-3 text-sm text-amber-700 dark:bg-amber-500/10 dark:text-amber-400">
          Cadastre uma conta antes de criar um lançamento.
        </p>
      )}

      {categories.length === 0 && !loadingCategories && (
        <p className="rounded-2xl bg-blue-50 px-4 py-3 text-sm text-blue-700 dark:bg-blue-500/10 dark:text-blue-300">
          Nenhuma categoria cadastrada. O lançamento será salvo sem categoria.
        </p>
      )}

      <div className="flex flex-col-reverse gap-3 pt-5 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="button"
          onClick={onCancel}
          disabled={saving}
          className="rounded-2xl border border-zinc-200 px-7 py-3.5 font-semibold text-slate-600 transition hover:bg-zinc-100 disabled:cursor-not-allowed disabled:opacity-60 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
        >
          Cancelar
        </button>

        <button
          type="submit"
          disabled={
            saving ||
            loadingAccounts ||
            loadingCategories ||
            accounts.length === 0 ||
            !accountId
          }
          className="flex items-center justify-center gap-3 rounded-2xl bg-blue-600 px-7 py-3.5 font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:-translate-y-0.5 hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0"
        >
          <Save size={20} />

          {saving ? "Salvando..." : buttonText}
        </button>
      </div>
    </form>
  );
}

export default TransactionForm;
