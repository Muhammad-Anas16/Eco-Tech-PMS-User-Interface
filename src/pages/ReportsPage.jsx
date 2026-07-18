import { BarChart3 } from "lucide-react";

import ModuleCard from "@/components/ModuleCard";
import PageCard from "@/components/common/PageCard";

import reportModules from "@/data/reportModules";

const ReportsPage = () => {
  return (
    <PageCard>
      <div className="rounded-3xl bg-gradient-to-r from-emerald-600 to-green-700 p-8 text-white shadow-lg">
        <div className="flex items-center gap-4">
          <div className="rounded-2xl bg-white/20 p-4">
            <BarChart3 className="h-10 w-10" />
          </div>

          <div>
            <h1 className="text-3xl font-bold">Reports & Analytics</h1>

            <p className="mt-2 text-emerald-100">
              Generate maintenance reports, analytics, KPIs and export data in
              multiple formats.
            </p>
          </div>
        </div>
      </div>

      <section className="mt-8">
        <h2 className="mb-6 text-2xl font-semibold">Reporting Modules</h2>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {reportModules.map((module) => (
            <ModuleCard key={module.id} module={module} />
          ))}
        </div>
      </section>
    </PageCard>
  );
};

export default ReportsPage;
