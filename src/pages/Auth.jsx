import { useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import {
  ArrowRight,
  CircleDollarSign,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  User,
} from "lucide-react";

import useAuth from "../hooks/useAuth";
import translateAuthError from "../utils/translateAuthError";

function Auth() {
  const [mode, setMode] = useState("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const { session, loading, signIn, signUp } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();

  const isLogin = mode === "login";
  const destination = location.state?.from?.pathname ?? "/";

  if (!loading && session) {
    return <Navigate to="/" replace />;
  }

  function changeMode(nextMode) {
    setMode(nextMode);
    setMessage("");
    setErrorMessage("");
  }

  async function handleSubmit(event) {
    event.preventDefault();

    setMessage("");
    setErrorMessage("");

    if (!email.trim() || !password) {
      setErrorMessage("Preencha o e-mail e a senha.");
      return;
    }

    if (!isLogin && !name.trim()) {
      setErrorMessage("Informe seu nome.");
      return;
    }

    if (password.length < 6) {
      setErrorMessage("A senha deve possuir pelo menos 6 caracteres.");
      return;
    }

    setSubmitting(true);

    const result = isLogin
      ? await signIn({
          email: email.trim(),
          password,
        })
      : await signUp({
          name: name.trim(),
          email: email.trim(),
          password,
        });

    setSubmitting(false);

    if (result.error) {
      console.error(result.error);
      setErrorMessage(translateAuthError(result.error.message));
      return;
    }

    if (isLogin || result.data.session) {
      navigate(destination, { replace: true });
      return;
    }

    setMessage(
      "Cadastro realizado. Verifique seu e-mail para confirmar a conta.",
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 px-5 py-10 text-white">
      <div className="mx-auto grid min-h-[calc(100vh-5rem)] max-w-6xl overflow-hidden rounded-[32px] border border-white/10 bg-slate-900 shadow-2xl lg:grid-cols-[1.05fr_0.95fr]">
        <section className="hidden flex-col justify-between bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-950 p-12 lg:flex">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-500">
              <CircleDollarSign size={27} />
            </div>

            <span className="text-xl font-bold">Bora Bills</span>
          </div>

          <div className="max-w-lg">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-indigo-300">
              Planejamento financeiro
            </p>

            <h1 className="mt-5 text-5xl font-bold leading-tight">
              Planeje hoje.
              <br />
              Viva tranquilo amanhã.
            </h1>

            <p className="mt-6 text-lg leading-8 text-slate-300">
              Organize receitas, despesas e previsões em um só lugar.
            </p>
          </div>

          <p className="text-sm text-slate-500">Bora Bills</p>
        </section>

        <section className="flex items-center bg-white p-6 text-slate-900 sm:p-10 lg:p-14">
          <div className="mx-auto w-full max-w-md">
            <div className="mb-9 lg:hidden">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-indigo-600 text-white">
                  <CircleDollarSign size={24} />
                </div>

                <span className="text-xl font-bold">Bora Bills</span>
              </div>
            </div>

            <p className="text-sm font-semibold text-indigo-600">
              {isLogin ? "Bem-vindo de volta" : "Comece agora"}
            </p>

            <h2 className="mt-2 text-4xl font-bold tracking-tight">
              {isLogin ? "Entre na sua conta" : "Crie sua conta"}
            </h2>

            <p className="mt-3 text-slate-500">
              {isLogin
                ? "Acesse seu planejamento financeiro."
                : "Cadastre-se para salvar seu planejamento na nuvem."}
            </p>

            <form onSubmit={handleSubmit} className="mt-9 space-y-4">
              {!isLogin && (
                <label className="flex items-center gap-3 rounded-2xl border border-slate-200 px-4 py-4 focus-within:border-indigo-500 focus-within:ring-4 focus-within:ring-indigo-500/10">
                  <User size={21} className="shrink-0 text-indigo-600" />

                  <input
                    type="text"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    placeholder="Seu nome"
                    autoComplete="name"
                    className="w-full bg-transparent outline-none transition placeholder:text-slate-400"
                  />
                </label>
              )}

              <label className="flex items-center gap-3 rounded-2xl border border-slate-200 px-4 py-4 focus-within:border-indigo-500 focus-within:ring-4 focus-within:ring-indigo-500/10">
                <Mail size={21} className="shrink-0 text-indigo-600" />

                <input
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="seuemail@exemplo.com"
                  autoComplete="email"
                  className="w-full bg-transparent outline-none transition placeholder:text-slate-400"
                />
              </label>

              <label className="flex items-center gap-3 rounded-2xl border border-slate-200 px-4 py-4 focus-within:border-indigo-500 focus-within:ring-4 focus-within:ring-indigo-500/10">
                <LockKeyhole size={21} className="shrink-0 text-indigo-600" />

                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="Sua senha"
                  autoComplete={isLogin ? "current-password" : "new-password"}
                  className="w-full bg-transparent outline-none transition placeholder:text-slate-400"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword((current) => !current)}
                  aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
                  className="text-slate-400 transition hover:text-slate-700"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </label>

              <div className="min-h-[52px]">
                {errorMessage && (
                  <p className="rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-600">
                    {errorMessage}
                  </p>
                )}

                {message && (
                  <p className="rounded-2xl bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
                    {message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="flex w-full items-center justify-center gap-2 rounded-2xl bg-indigo-600 px-5 py-4 font-semibold text-white shadow-lg shadow-indigo-600/20 transition hover:-translate-y-0.5 hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {submitting ? "Aguarde..." : isLogin ? "Entrar" : "Criar conta"}

                {!submitting && <ArrowRight size={19} />}
              </button>
            </form>

            <div className="mt-7 text-center text-sm text-slate-500">
              {isLogin ? "Ainda não possui uma conta?" : "Já possui uma conta?"}

              <button
                type="button"
                onClick={() => changeMode(isLogin ? "register" : "login")}
                className="ml-2 font-semibold text-indigo-600 hover:text-indigo-700"
              >
                {isLogin ? "Criar conta" : "Entrar"}
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Auth;
