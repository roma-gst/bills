import { useEffect, useState } from "react";
import { ArrowLeft, Mail, Save, User } from "lucide-react";
import { Link } from "react-router-dom";

import useAuth from "../hooks/useAuth";
import useProfile from "../hooks/useProfile";
import { updateProfile } from "../services/profile";

function Profile() {
  const { user } = useAuth();
  const { profile } = useProfile();

  const [name, setName] = useState("");
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    setName(profile?.name ?? "");
  }, [profile]);

  async function handleSubmit(event) {
    event.preventDefault();

    if (!name.trim() || !user) return;

    setSaving(true);
    setMessage("");
    setErrorMessage("");

    try {
      await updateProfile(user.id, {
        name: name.trim(),
      });

      setMessage("Perfil atualizado com sucesso.");
    } catch (error) {
      console.error(error);
      setErrorMessage("Não foi possível atualizar o perfil.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="min-h-screen bg-zinc-100 px-6 py-8 transition-colors dark:bg-slate-950">
      <main className="mx-auto max-w-3xl">
        <Link
          to="/"
          className="mb-8 inline-flex items-center gap-2 text-zinc-600 transition hover:text-zinc-900 hover:underline dark:text-slate-400 dark:hover:text-white"
        >
          <ArrowLeft size={18} />
          Voltar
        </Link>

        <section className="rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm transition-colors dark:border-slate-700 dark:bg-slate-900">
          <div>
            <p className="text-sm font-semibold text-indigo-600 dark:text-indigo-400">
              Sua conta
            </p>

            <h1 className="mt-2 text-4xl font-bold text-zinc-900 dark:text-white">
              Perfil
            </h1>

            <p className="mt-2 text-zinc-500 dark:text-slate-400">
              Atualize as informações da sua conta.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            <label className="block">
              <span className="mb-2 block text-sm font-medium text-zinc-700 dark:text-slate-300">
                Nome
              </span>

              <div className="flex items-center gap-3 rounded-2xl border border-zinc-200 px-4 py-4 focus-within:border-indigo-500 focus-within:ring-4 focus-within:ring-indigo-500/10 dark:border-slate-700">
                <User
                  size={20}
                  className="text-indigo-600 dark:text-indigo-400"
                />

                <input
                  type="text"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  className="w-full bg-transparent text-zinc-900 outline-none transition dark:text-white"
                />
              </div>
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-medium text-zinc-700 dark:text-slate-300">
                E-mail
              </span>

              <div className="flex items-center gap-3 rounded-2xl border border-zinc-200 bg-zinc-50 px-4 py-4 dark:border-slate-700 dark:bg-slate-800">
                <Mail size={20} className="text-zinc-400 dark:text-slate-500" />

                <input
                  type="email"
                  value={user?.email ?? ""}
                  disabled
                  className="w-full bg-transparent text-zinc-500 outline-none dark:text-slate-400"
                />
              </div>
            </label>

            <div className="min-h-[48px]">
              {message && (
                <p className="rounded-xl bg-emerald-50 px-4 py-3 text-sm text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400">
                  {message}
                </p>
              )}

              {errorMessage && (
                <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600 dark:bg-red-500/10 dark:text-red-400">
                  {errorMessage}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={saving}
              className="flex items-center justify-center gap-2 rounded-2xl bg-indigo-600 px-6 py-4 font-semibold text-white transition hover:-translate-y-0.5 hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <Save size={19} />
              {saving ? "Salvando..." : "Salvar alterações"}
            </button>
          </form>
        </section>
      </main>
    </div>
  );
}

export default Profile;
