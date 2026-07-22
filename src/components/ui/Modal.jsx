import { X } from "lucide-react";

function Modal({ title, children, onClose }) {
  function handleBackdropClick(event) {
    if (event.target === event.currentTarget) {
      onClose();
    }
  }

  return (
    <div
      role="presentation"
      onMouseDown={handleBackdropClick}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        className="flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden rounded-3xl border border-zinc-200 bg-zinc-50 shadow-2xl dark:border-slate-700 dark:bg-slate-900"
      >
        <header className="flex shrink-0 items-center justify-between border-b border-zinc-200 px-6 py-4 dark:border-slate-700">
          <h2
            id="modal-title"
            className="text-xl font-bold text-zinc-900 dark:text-white"
          >
            {title}
          </h2>

          <button
            type="button"
            onClick={onClose}
            aria-label="Fechar modal"
            className="flex h-10 w-10 items-center justify-center rounded-xl text-zinc-500 transition hover:bg-zinc-200 hover:text-zinc-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white"
          >
            <X size={21} />
          </button>
        </header>

        <div className="overflow-y-auto px-6 py-5">{children}</div>
      </section>
    </div>
  );
}

export default Modal;
