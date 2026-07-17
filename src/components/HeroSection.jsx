const HeroSection = ({ modules }) => {
  const stats = [
    {
      id: 1,
      title: "Total Modules",
      value: modules.length,
      color: "text-slate-800",
    },
    {
      id: 2,
      title: "Pending Jobs",
      value: 12,
      color: "text-amber-600",
    },
    {
      id: 3,
      title: "Completed Today",
      value: 38,
      color: "text-emerald-600",
    },
    {
      id: 4,
      title: "Active Users",
      value: 27,
      color: "text-sky-600",
    },
  ];

  return (
    <section className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((item) => (
        <div
          key={item.id}
          className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg cursor-pointer"
        >
          <p className="text-sm font-medium text-slate-500">{item.title}</p>

          <h2 className={`mt-2 text-3xl font-bold ${item.color}`}>
            {item.value}
          </h2>
        </div>
      ))}
    </section>
  );
};

export default HeroSection;
