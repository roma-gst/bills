import { ArrowLeft, SearchX } from "lucide-react";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 px-6 text-white">
      <div className="max-w-md text-center">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-white/10">
          <SearchX size={38} />
        </div>

        <p className="mt-7 text-sm font-semibold uppercase tracking-[0.25em] text-indigo-300">
          Erro 404
        </p>

        <h1 className="mt-3 text-4xl font-bold">Página não encontrada</h1>

        <p className="mt-4 text-slate-400">
          O endereço acessado não existe ou foi removido.
        </p>

        <Link
          to="/"
          className="mt-8 inline-flex items-center gap-2 rounded-2xl bg-indigo-600 px-6 py-3 font-semibold transition hover:-translate-y-0.5 hover:bg-indigo-700"
        >
          <ArrowLeft size={18} />
          Voltar ao início
        </Link>
      </div>
    </div>
  );
}

export default NotFound;
