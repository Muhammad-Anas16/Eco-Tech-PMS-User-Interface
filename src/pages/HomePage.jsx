import Header from "@/components/Header";
import ModuleCard from "@/components/ModuleCard";
import modules from "@/data/modules";
import { Button } from "@/components/ui/button";

const HomePage = () => {
  return (
    <div className="min-h-screen bg-slate-100">
      <Header />

      <main className="mx-auto max-w-7xl px-6 py-8">
        {/* Hero */}

        <section className="mb-10 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-2xl border bg-white p-6 shadow-sm">
            <p className="text-sm text-slate-500">Total Modules</p>

            <h2 className="mt-2 text-3xl font-bold text-slate-800">
              {modules.length}
            </h2>
          </div>

          <div className="rounded-2xl border bg-white p-6 shadow-sm">
            <p className="text-sm text-slate-500">Pending Jobs</p>

            <h2 className="mt-2 text-3xl font-bold text-amber-600">12</h2>
          </div>

          <div className="rounded-2xl border bg-white p-6 shadow-sm">
            <p className="text-sm text-slate-500">Completed Today</p>

            <h2 className="mt-2 text-3xl font-bold text-emerald-600">38</h2>
          </div>

          <div className="rounded-2xl border bg-white p-6 shadow-sm">
            <p className="text-sm text-slate-500">Active Users</p>

            <h2 className="mt-2 text-3xl font-bold text-sky-600">27</h2>
          </div>
        </section>

        {/* Modules */}

        <section>
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-slate-800">
                System Modules
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Select a module to continue.
              </p>
            </div>

            <Button>View All</Button>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {modules.map((module) => (
              <ModuleCard key={module.id} module={module} />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default HomePage;
