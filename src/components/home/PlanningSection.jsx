import MonthCard from "./MonthCard";
import MonthListItem from "./MonthListItem";

function PlanningSection({ monthsData }) {
  return (
    <section className="mt-14">
      <div className="mb-8 flex items-end justify-between gap-4">
        <div>
          <h2 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-white dark:text-white transition-colors dark:text-white">
            Seus meses
          </h2>

          <p className="mt-2 max-w-lg text-zinc-500 dark:text-slate-400 transition-colors dark:text-slate-400">
            Visualize rapidamente a situação de cada mês do seu planejamento.
          </p>
        </div>

        <span className="hidden shrink-0 rounded-full border border-zinc-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-4 py-2 text-sm font-medium text-zinc-700 shadow-sm transition-all duration-200 transition-colors sm:inline-flex dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300">
          {monthsData.length} meses
        </span>
      </div>

      <div className="space-y-3 md:hidden">
        {monthsData.map((month) => (
          <MonthListItem key={month.nome} month={month} />
        ))}
      </div>

      <div className="hidden grid-cols-2 gap-6 md:grid lg:grid-cols-4">
        {monthsData.map((month) => (
          <MonthCard key={month.nome} month={month} />
        ))}
      </div>
    </section>
  );
}

export default PlanningSection;
