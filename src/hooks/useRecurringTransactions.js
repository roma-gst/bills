import { useCallback, useEffect, useState } from "react";

import useAuth from "./useAuth";

import {
  createRecurringTransaction,
  deleteRecurringTransaction,
  generateRecurringTransactions,
  getRecurringTransactions,
  removeFutureRecurringTransactions,
  updateRecurringTransaction,
} from "../services/recurringTransactions";

const CURRENT_YEAR = new Date().getFullYear();

export default function useRecurringTransactions() {
  const { user } = useAuth();

  const [recurringTransactions, setRecurringTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const loadRecurringTransactions = useCallback(async () => {
    if (!user) {
      setRecurringTransactions([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setErrorMessage("");

      const data = await getRecurringTransactions(user.id);

      setRecurringTransactions(data);
    } catch (error) {
      console.error(error);
      setErrorMessage("Não foi possível carregar as recorrências.");
    } finally {
      setLoading(false);
    }
  }, [user]);

  async function addRecurringTransaction(values) {
    if (!user) {
      throw new Error("Usuário não autenticado.");
    }

    try {
      setErrorMessage("");

      const created = await createRecurringTransaction({
        ...values,
        user_id: user.id,
      });

      await generateRecurringTransactions(CURRENT_YEAR);

      setRecurringTransactions((current) => [...current, created]);

      return created;
    } catch (error) {
      console.error(error);

      setErrorMessage(error.message || "Não foi possível criar a recorrência.");

      throw error;
    }
  }

  async function editRecurringTransaction(id, values) {
    try {
      setErrorMessage("");

      const updated = await updateRecurringTransaction(id, values);

      await removeFutureRecurringTransactions(id);

      if (updated.active) {
        await generateRecurringTransactions(CURRENT_YEAR);
      }

      setRecurringTransactions((current) =>
        current.map((item) => (item.id === id ? updated : item)),
      );

      return updated;
    } catch (error) {
      console.error(error);

      setErrorMessage(
        error.message || "Não foi possível editar a recorrência.",
      );

      throw error;
    }
  }

  async function toggleRecurringTransaction(item) {
    return editRecurringTransaction(item.id, {
      active: !item.active,
    });
  }

  async function removeRecurringTransaction(id) {
    try {
      setErrorMessage("");

      await removeFutureRecurringTransactions(id);
      await deleteRecurringTransaction(id);

      setRecurringTransactions((current) =>
        current.filter((item) => item.id !== id),
      );
    } catch (error) {
      console.error(error);

      setErrorMessage(
        error.message || "Não foi possível excluir a recorrência.",
      );

      throw error;
    }
  }

  useEffect(() => {
    loadRecurringTransactions();
  }, [loadRecurringTransactions]);

  return {
    recurringTransactions,
    loading,
    errorMessage,
    reload: loadRecurringTransactions,
    addRecurringTransaction,
    editRecurringTransaction,
    toggleRecurringTransaction,
    removeRecurringTransaction,
  };
}
