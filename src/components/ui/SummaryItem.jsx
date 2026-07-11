import {
  ArrowDownRight,
  ArrowUpRight,
  Wallet,
  TriangleAlert,
} from "lucide-react";

function SummaryItem({ title, value, variant }) {
  const variants = {
    success: {
      bg: "bg-emerald-100 dark:bg-emerald-500/10",
      text: "text-emerald-600 dark:text-emerald-400",
      Icon: ArrowUpRight,
    },
    danger: {
      bg: "bg-red-100 dark:bg-red-500/10",
      text: "text-red-500 dark:text-red-400",
      Icon: ArrowDownRight,
    },
    primary: {
      bg: "bg-indigo-100 dark:bg-indigo-500/10",
      text: "text-indigo-600 dark:text-indigo-400",
      Icon: Wallet,
    },
    warning: {
      bg: "bg-orange-100 dark:bg-orange-500/10",
      text: "text-orange-600 dark:text-orange-400",
      Icon: TriangleAlert,
    },
  };

  const current = variants[variant];

  return (
    <article className="rounded-3xl border border-zinc-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-6 shadow-sm transition-all duration-200 transition-all hover:-translate-y-1 hover:shadow-lg dark:border-slate-700 dark:bg-slate-900">
      <div
        className={`mb-5 flex h-12 w-12 items-center justify-center rounded-xl ${current.bg}`}
      >
        <current.Icon className={current.text} size={22} />
      </div>

      <p className="text-sm text-zinc-500 dark:text-slate-400 dark:text-slate-400">{title}</p>

      <h3 className={`mt-2 text-3xl font-bold ${current.text}`}>{value}</h3>
    </article>
  );
}

export default SummaryItem;
