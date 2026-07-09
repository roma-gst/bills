import MonthCard from "./MonthCard";
import MonthListItem from "./MonthListItem";

function PlanningSection({ monthsData }) {
  return (
    <section className="mt-14">
      <div className="mb-8 flex items-end justify-between">
        <div>
          <h2 className="text-4xl font-bold tracking-tight text-zinc-900">
            Seus meses
          </h2>

          <p className="mt-2 max-w-lg text-zinc-500">
            Visualize rapidamente a situação de cada mês do seu planejamento.
          </p>
        </div>

        <span className="rounded-full bg-white px-4 py-2 text-sm font-medium text-zinc-600 shadow-sm">
          {monthsData.length} meses
        </span>
      </div>

      {/* Mobile */}
      <div className="space-y-3 md:hidden">
        {monthsData.map((month) => (
          <MonthListItem key={month.nome} month={month} />
        ))}
      </div>

      {/* Desktop */}
      <div className="hidden grid-cols-2 gap-6 md:grid lg:grid-cols-4">
        {monthsData.map((month) => (
          <MonthCard key={month.nome} month={month} />
        ))}
      </div>
    </section>
  );
}

export default PlanningSection;
