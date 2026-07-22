import { useCallback, useEffect, useState } from "react";

import useAuth from "./useAuth";

import {
  createCategory,
  deleteCategory,
  getCategories,
  updateCategory,
} from "../services/categories";

export default function useCategories() {
  const { user } = useAuth();

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const loadCategories = useCallback(async () => {
    if (!user) {
      setCategories([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setErrorMessage("");

      const data = await getCategories(user.id);

      setCategories(data);
    } catch (error) {
      console.error(error);
      setErrorMessage("Não foi possível carregar as categorias.");
    } finally {
      setLoading(false);
    }
  }, [user]);

  async function addCategory(category) {
    if (!user) {
      throw new Error("Usuário não autenticado.");
    }

    try {
      setErrorMessage("");

      const created = await createCategory({
        ...category,
        user_id: user.id,
      });

      setCategories((current) =>
        [...current, created].sort((a, b) =>
          a.name.localeCompare(b.name, "pt-BR"),
        ),
      );

      return created;
    } catch (error) {
      console.error(error);
      setErrorMessage(error.message || "Não foi possível criar a categoria.");
      throw error;
    }
  }

  async function editCategory(id, values) {
    try {
      setErrorMessage("");

      const updated = await updateCategory(id, values);

      setCategories((current) =>
        current
          .map((category) => (category.id === id ? updated : category))
          .sort((a, b) => a.name.localeCompare(b.name, "pt-BR")),
      );

      return updated;
    } catch (error) {
      console.error(error);
      setErrorMessage(error.message || "Não foi possível editar a categoria.");
      throw error;
    }
  }

  async function removeCategory(id) {
    try {
      setErrorMessage("");

      await deleteCategory(id);

      setCategories((current) =>
        current.filter((category) => category.id !== id),
      );
    } catch (error) {
      console.error(error);

      setErrorMessage(error.message || "Não foi possível excluir a categoria.");

      throw error;
    }
  }

  useEffect(() => {
    loadCategories();
  }, [loadCategories]);

  return {
    categories,
    loading,
    errorMessage,
    reload: loadCategories,
    addCategory,
    editCategory,
    removeCategory,
  };
}
