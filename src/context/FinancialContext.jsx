import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import useAuth from "../hooks/useAuth";

import {
  createTransaction,
  editTransaction,
  getTransactions,
  removeTransaction,
} from "../services/transactions";

import { generateRecurringTransactions } from "../services/recurringTransactions";

const FinancialContext = createContext(null);

const MONTH_NAMES = [
  "Janeiro",
  "Fevereiro",
  "Março",
  "Abril",
  "Maio",
  "Junho",
  "Julho",
  "Agosto",
  "Setembro",
  "Outubro",
  "Novembro",
  "Dezembro",
];

const CURRENT_YEAR = new Date().getFullYear();

function normalizeTransaction(transaction) {
  return {
    ...transaction,
    amount: Number(transaction.amount),
    paid: Boolean(transaction.paid),
  };
}

function createMonthsData(transactions) {
  return MONTH_NAMES.map((monthName, monthIndex) => {
    const monthNumber = monthIndex + 1;

    const monthTransactions = transactions.filter(
      (transaction) => Number(transaction.month) === monthNumber,
    );

    const receitas = monthTransactions
      .filter((transaction) => transaction.type === "income")
      .map((transaction) => ({
        id: transaction.id,
        descricao: transaction.description,
        valor: Number(transaction.amount),
        account_id: transaction.account_id,
        category_id: transaction.category_id,
        recurring: transaction.recurring,
        recurring_rule_id: transaction.recurring_rule_id,
        due_date: transaction.due_date,
        paid: Boolean(transaction.paid),
      }));

    const despesasFixas = monthTransactions
      .filter((transaction) => transaction.type === "expense")
      .map((transaction) => ({
        id: transaction.id,
        descricao: transaction.description,
        valor: Number(transaction.amount),
        account_id: transaction.account_id,
        category_id: transaction.category_id,
        recurring: transaction.recurring,
        recurring_rule_id: transaction.recurring_rule_id,
        due_date: transaction.due_date,
        paid: Boolean(transaction.paid),
      }));

    return {
      nome: monthName,
      receitas,
      despesasFixas,
      despesasVariaveis: [],
    };
  });
}

function getMonthNumber(monthName) {
  return MONTH_NAMES.indexOf(monthName) + 1;
}

export function FinancialProvider({ children }) {
  const { user } = useAuth();

  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const monthsData = useMemo(
    () => createMonthsData(transactions),
    [transactions],
  );

  const loadTransactions = useCallback(async () => {
    if (!user) {
      setTransactions([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setErrorMessage("");

      await generateRecurringTransactions(CURRENT_YEAR);

      const data = await getTransactions(user.id, CURRENT_YEAR);

      setTransactions(data.map(normalizeTransaction));
    } catch (error) {
      console.error(error);
      setErrorMessage("Não foi possível carregar os lançamentos.");
      throw error;
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    loadTransactions().catch(() => {});
  }, [loadTransactions]);

  function getRevenueByIndex(monthName, index) {
    const month = monthsData.find((item) => item.nome === monthName);

    return month?.receitas[index] ?? null;
  }

  function getExpenseByIndex(monthName, index) {
    const month = monthsData.find((item) => item.nome === monthName);

    return month?.despesasFixas[index] ?? null;
  }

  async function addRevenue({
    description,
    value,
    month,
    accountId,
    categoryId,
  }) {
    if (!user) {
      throw new Error("Usuário não autenticado.");
    }

    try {
      setErrorMessage("");

      const created = await createTransaction({
        user_id: user.id,
        account_id: accountId,
        category_id: categoryId || null,
        type: "income",
        description: description.trim(),
        amount: Number(value),
        month: getMonthNumber(month),
        year: CURRENT_YEAR,
        recurring: false,
        paid: false,
      });

      setTransactions((current) => [...current, normalizeTransaction(created)]);

      return created;
    } catch (error) {
      console.error(error);
      setErrorMessage("Não foi possível adicionar a receita.");
      throw error;
    }
  }

  async function addFixedExpense({
    description,
    value,
    month,
    accountId,
    categoryId,
  }) {
    if (!user) {
      throw new Error("Usuário não autenticado.");
    }

    try {
      setErrorMessage("");

      const created = await createTransaction({
        user_id: user.id,
        account_id: accountId,
        category_id: categoryId || null,
        type: "expense",
        description: description.trim(),
        amount: Number(value),
        month: getMonthNumber(month),
        year: CURRENT_YEAR,
        recurring: false,
        paid: false,
      });

      setTransactions((current) => [...current, normalizeTransaction(created)]);

      return created;
    } catch (error) {
      console.error(error);
      setErrorMessage("Não foi possível adicionar a despesa.");
      throw error;
    }
  }

  async function updateRevenue(monthName, revenueIndex, updatedRevenue) {
    const revenue = getRevenueByIndex(monthName, revenueIndex);

    if (!revenue) {
      return;
    }

    try {
      setErrorMessage("");

      const updated = await editTransaction(revenue.id, {
        description: updatedRevenue.description.trim(),
        amount: Number(updatedRevenue.value),
        account_id: updatedRevenue.accountId,
        category_id: updatedRevenue.categoryId || null,
      });

      setTransactions((current) =>
        current.map((transaction) =>
          transaction.id === revenue.id
            ? normalizeTransaction(updated)
            : transaction,
        ),
      );

      return updated;
    } catch (error) {
      console.error(error);
      setErrorMessage("Não foi possível editar a receita.");
      throw error;
    }
  }

  async function updateFixedExpense(monthName, expenseIndex, updatedExpense) {
    const expense = getExpenseByIndex(monthName, expenseIndex);

    if (!expense) {
      return;
    }

    try {
      setErrorMessage("");

      const updated = await editTransaction(expense.id, {
        description: updatedExpense.description.trim(),
        amount: Number(updatedExpense.value),
        account_id: updatedExpense.accountId,
        category_id: updatedExpense.categoryId || null,
      });

      setTransactions((current) =>
        current.map((transaction) =>
          transaction.id === expense.id
            ? normalizeTransaction(updated)
            : transaction,
        ),
      );

      return updated;
    } catch (error) {
      console.error(error);
      setErrorMessage("Não foi possível editar a despesa.");
      throw error;
    }
  }

  async function toggleTransactionPaid(transactionId, paid) {
    try {
      setErrorMessage("");

      const updated = await editTransaction(transactionId, {
        paid: Boolean(paid),
      });

      setTransactions((current) =>
        current.map((transaction) =>
          transaction.id === transactionId
            ? normalizeTransaction(updated)
            : transaction,
        ),
      );

      return updated;
    } catch (error) {
      console.error(error);
      setErrorMessage("Não foi possível atualizar o status do lançamento.");
      throw error;
    }
  }

  async function removeRevenue(monthName, revenueIndex) {
    const revenue = getRevenueByIndex(monthName, revenueIndex);

    if (!revenue) {
      return;
    }

    try {
      setErrorMessage("");

      await removeTransaction(revenue.id);

      setTransactions((current) =>
        current.filter((transaction) => transaction.id !== revenue.id),
      );
    } catch (error) {
      console.error(error);
      setErrorMessage("Não foi possível excluir a receita.");
      throw error;
    }
  }

  async function removeFixedExpense(monthName, expenseIndex) {
    const expense = getExpenseByIndex(monthName, expenseIndex);

    if (!expense) {
      return;
    }

    try {
      setErrorMessage("");

      await removeTransaction(expense.id);

      setTransactions((current) =>
        current.filter((transaction) => transaction.id !== expense.id),
      );
    } catch (error) {
      console.error(error);
      setErrorMessage("Não foi possível excluir a despesa.");
      throw error;
    }
  }

  const value = {
    monthsData,
    transactions,
    loading,
    errorMessage,
    reloadTransactions: loadTransactions,
    addRevenue,
    addFixedExpense,
    updateRevenue,
    updateFixedExpense,
    toggleTransactionPaid,
    removeRevenue,
    removeFixedExpense,
  };

  return (
    <FinancialContext.Provider value={value}>
      {children}
    </FinancialContext.Provider>
  );
}

export function useFinancial() {
  const context = useContext(FinancialContext);

  if (!context) {
    throw new Error("useFinancial deve ser usado dentro de FinancialProvider.");
  }

  return context;
}
