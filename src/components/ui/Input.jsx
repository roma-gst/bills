import { cn } from "../../utils/cn";

function Input({ icon: Icon, className = "", ...props }) {
  return (
    <label
      className={cn(
        "flex items-center gap-3 rounded-2xl border border-zinc-200 bg-white px-4 py-4 transition",
        "focus-within:border-indigo-500 focus-within:ring-4 focus-within:ring-indigo-500/10",
        "dark:border-slate-700 dark:bg-slate-800",
        className,
      )}
    >
      {Icon && (
        <Icon
          size={21}
          className="shrink-0 text-indigo-600 dark:text-indigo-400"
        />
      )}

      <input
        {...props}
        className="w-full bg-transparent text-zinc-900 outline-none placeholder:text-slate-400 dark:text-white"
      />
    </label>
  );
}

export default Input;
