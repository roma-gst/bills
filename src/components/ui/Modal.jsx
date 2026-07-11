import { CircleDollarSign, X } from "lucide-react";

function Modal({ title, children, onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 px-4 backdrop-blur-sm">
      <div className="w-full max-w-lg rounded-3xl border border-zinc-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-6 shadow-2xl transition-colors dark:border-slate-700 dark:bg-slate-900">
        <div className="mb-6 flex items-start justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 transition-colors dark:bg-blue-500/10 dark:text-blue-400">
              <CircleDollarSign size={26} />
            </div>

            <div>
              <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white transition-colors dark:text-white">
                {title}
              </h2>

              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400 transition-colors dark:text-slate-400">
                Preencha os dados abaixo.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Fechar modal"
            className="rounded-full bg-zinc-100 dark:bg-slate-800 p-2.5 text-slate-600 transition hover:bg-zinc-200 dark:bg-slate-700 hover:text-slate-900 dark:text-white dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700 dark:hover:text-white"
          >
            <X size={20} />
          </button>
        </div>

        {children}
      </div>
    </div>
  );
}

export default Modal;
