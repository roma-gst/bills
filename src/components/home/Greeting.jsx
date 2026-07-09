function Greeting() {
  const hour = new Date().getHours();

  let greeting = "Boa noite";
  let message = "Seu planejamento está sob controle.";

  if (hour >= 5 && hour < 12) {
    greeting = "Bom dia";
  } else if (hour >= 12 && hour < 18) {
    greeting = "Boa tarde";
  }

  return (
    <section className="mb-8">
      <p className="text-sm font-semibold text-indigo-600">{greeting} 👋</p>
{/* 
      <h2 className="mt-2 text-5xl font-bold tracking-tight text-zinc-900">
        NiggaBills
      </h2> */}

      <p className="mt-3 max-w-xl text-lg text-zinc-500">{message}</p>
    </section>
  );
}

export default Greeting;
