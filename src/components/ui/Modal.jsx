import { X, CircleDollarSign } from "lucide-react";

function Modal({ title, children, onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 px-4 backdrop-blur-sm">
      <div className="w-full max-w-2xl rounded-[32px] bg-white p-8 shadow-2xl">
        <div className="mb-8 flex items-start justify-between">
          <div className="flex items-center gap-5">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
              <CircleDollarSign size={34} />
            </div>

            <div>
              <h2 className="text-4xl font-bold tracking-tight text-slate-900">
                {title}
              </h2>

              <p className="mt-2 text-lg text-slate-500">
                Preencha os dados abaixo.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="rounded-full bg-zinc-100 p-3 text-slate-600 transition hover:bg-zinc-200 hover:text-slate-900"
          >
            <X size={26} />
          </button>
        </div>

        {children}
      </div>
    </div>
  );
}

export default Modal;
