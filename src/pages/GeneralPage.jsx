import { Database } from "lucide-react";

import generalModules from "@/data/generalModules";

import ModuleCard from "@/components/ModuleCard";
import PageCard from "@/components/common/PageCard";

const GeneralPage = () => {
  return (
    <PageCard>
      {/* Hero */}

      <div className="rounded-3xl bg-gradient-to-r from-slate-700 to-slate-900 p-8 text-white shadow-lg">
        <div className="flex items-center gap-4">
          <div className="rounded-2xl bg-white/20 p-4">
            <Database className="h-10 w-10" />
          </div>

          <div>
            <h1 className="text-3xl font-bold">General Master Data</h1>

            <p className="mt-2 text-slate-200">
              Manage all master records used throughout the Plant Maintenance
              System.
            </p>
          </div>
        </div>
      </div>

      {/* Modules */}

      <section className="mt-8">
        <h2 className="mb-6 text-2xl font-semibold">General Modules</h2>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {generalModules.map((module) => (
            <ModuleCard key={module.id} module={module} />
          ))}
        </div>
      </section>
    </PageCard>
  );
};

export default GeneralPage;
