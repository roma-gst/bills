import { useState } from "react";
import { Pencil, Plus, Trash2 } from "lucide-react";

import useCategories from "../hooks/useCategories";

import CategoryForm from "../components/categories/CategoryForm";
import Modal from "../components/ui/Modal";

function Categories() {
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  const {
    categories,
    loading,
    errorMessage,
    addCategory,
    editCategory,
    removeCategory,
  } = useCategories();

  function openCreateModal() {
    setEditing(null);
    setOpen(true);
  }

  function openEditModal(category) {
    setEditing(category);
    setOpen(true);
  }

  function closeModal() {
    setEditing(null);
    setOpen(false);
  }

  async function handleSaveCategory(category) {
    if (editing) {
      await editCategory(editing.id, category);
    } else {
      await addCategory(category);
    }

    closeModal();
  }

  async function handleDeleteCategory(category) {
    const confirmed = window.confirm(
      `Deseja excluir a categoria "${category.name}"?`,
    );

    if (!confirmed) {
      return;
    }

    try {
      setDeletingId(category.id);
      await removeCategory(category.id);
    } catch (error) {
      console.error(error);
    } finally {
      setDeletingId(null);
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-100 transition-colors dark:bg-slate-950">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-indigo-600/20 border-t-indigo-600 dark:border-white/20 dark:border-t-white" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-100 via-stone-50 to-zinc-200 px-6 py-8 transition-colors dark:from-slate-950 dark:via-slate-950 dark:to-slate-900">
      <main className="mx-auto max-w-6xl">
        <header className="mb-8 flex items-center justify-between gap-4">
          <div>
            <h1 className="text-4xl font-bold text-zinc-900 dark:text-white">
              Categorias
            </h1>

            <p className="mt-2 text-zinc-500 dark:text-slate-400">
              Organize suas receitas e despesas.
            </p>
          </div>

          <button
            type="button"
            onClick={openCreateModal}
            className="flex shrink-0 items-center gap-2 rounded-2xl bg-indigo-600 px-5 py-3 font-semibold text-white transition hover:-translate-y-0.5 hover:bg-indigo-700"
          >
            <Plus size={20} />
            Nova categoria
          </button>
        </header>

        {errorMessage && (
          <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-900 dark:bg-red-950/40 dark:text-red-300">
            {errorMessage}
          </div>
        )}

        {categories.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-zinc-300 p-12 text-center dark:border-slate-700">
            <div className="text-5xl">🏷️</div>

            <h2 className="mt-4 text-xl font-semibold text-zinc-900 dark:text-white">
              Nenhuma categoria cadastrada
            </h2>

            <p className="mt-2 text-zinc-500 dark:text-slate-400">
              Crie categorias para organizar seus lançamentos.
            </p>
          </div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((category) => (
              <article
                key={category.id}
                className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg dark:border-slate-700 dark:bg-slate-900"
              >
                <div className="flex items-center gap-4">
                  <div
                    className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl text-2xl"
                    style={{
                      backgroundColor: `${category.color || "#4f46e5"}20`,
                      border: `1px solid ${category.color || "#4f46e5"}40`,
                    }}
                  >
                    {category.icon || "🏷️"}
                  </div>

                  <div className="min-w-0">
                    <h2 className="truncate text-xl font-bold text-zinc-900 dark:text-white">
                      {category.name}
                    </h2>

                    <div className="mt-2 flex items-center gap-2">
                      <span
                        className="h-3 w-3 rounded-full"
                        style={{
                          backgroundColor: category.color || "#4f46e5",
                        }}
                      />

                      <span className="text-sm text-zinc-500 dark:text-slate-400">
                        {category.color || "#4f46e5"}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex gap-3">
                  <button
                    type="button"
                    onClick={() => openEditModal(category)}
                    className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-zinc-200 px-3 py-2 text-zinc-700 transition hover:bg-zinc-100 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
                  >
                    <Pencil size={16} />
                    Editar
                  </button>

                  <button
                    type="button"
                    disabled={deletingId === category.id}
                    onClick={() => handleDeleteCategory(category)}
                    className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-red-300 px-3 py-2 text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-60 dark:border-red-800 dark:text-red-400 dark:hover:bg-red-900/20"
                  >
                    <Trash2 size={16} />

                    {deletingId === category.id ? "Excluindo..." : "Excluir"}
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}

        {open && (
          <Modal
            title={editing ? "Editar categoria" : "Nova categoria"}
            onClose={closeModal}
          >
            <CategoryForm
              initialValues={editing}
              onSave={handleSaveCategory}
              onCancel={closeModal}
            />
          </Modal>
        )}
      </main>
    </div>
  );
}

export default Categories;
