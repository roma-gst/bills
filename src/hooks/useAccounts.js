import { useEffect, useState } from "react";

import useAuth from "./useAuth";
import {
  createAccount,
  deleteAccount,
  getAccounts,
  updateAccount,
} from "../services/accounts";

export default function useAccounts() {
  const { user } = useAuth();

  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  async function loadAccounts() {
    if (!user) {
      setAccounts([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setErrorMessage("");

      const data = await getAccounts(user.id);
      setAccounts(data);
    } catch (error) {
      console.error(error);
      setErrorMessage("Não foi possível carregar as contas.");
    } finally {
      setLoading(false);
    }
  }

  async function addAccount(account) {
    if (!user) {
      throw new Error("Usuário não autenticado.");
    }

    setErrorMessage("");

    try {
      const created = await createAccount({
        ...account,
        user_id: user.id,
      });

      setAccounts((current) => [...current, created]);

      return created;
    } catch (error) {
      console.error(error);
      setErrorMessage(error.message || "Não foi possível criar a conta.");
      throw error;
    }
  }

  async function editAccount(id, values) {
    setErrorMessage("");

    try {
      const updated = await updateAccount(id, values);

      setAccounts((current) =>
        current.map((account) => (account.id === id ? updated : account)),
      );

      return updated;
    } catch (error) {
      console.error(error);
      setErrorMessage(error.message || "Não foi possível editar a conta.");
      throw error;
    }
  }

  async function removeAccount(id) {
    setErrorMessage("");

    try {
      await deleteAccount(id);

      setAccounts((current) => current.filter((account) => account.id !== id));
    } catch (error) {
      console.error(error);
      setErrorMessage(error.message || "Não foi possível excluir a conta.");
      throw error;
    }
  }

  useEffect(() => {
    loadAccounts();
  }, [user]);

  return {
    accounts,
    loading,
    errorMessage,
    reload: loadAccounts,
    addAccount,
    editAccount,
    removeAccount,
  };
}
