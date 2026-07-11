import useProfile from "../../hooks/useProfile";

function Greeting() {
  const { profile } = useProfile();

  const hour = new Date().getHours();

  let greeting = "Boa noite";

  if (hour >= 5 && hour < 12) {
    greeting = "Bom dia";
  } else if (hour >= 12 && hour < 18) {
    greeting = "Boa tarde";
  }

  const rawFirstName = profile?.name?.trim().split(" ")[0] ?? "Usuário";

  const firstName =
    rawFirstName.charAt(0).toUpperCase() + rawFirstName.slice(1).toLowerCase();

  return (
    <section className="mb-8">
      <p className="text-lg text-zinc-500 dark:text-slate-400 transition-colors dark:text-slate-400">
        {greeting},
      </p>

      <h1 className="mt-1 text-4xl font-bold tracking-tight text-zinc-900 dark:text-white dark:text-white transition-colors dark:text-white">
        {firstName} 👋
      </h1>
    </section>
  );
}

export default Greeting;
