import { Wrench } from "lucide-react";

import ModuleCard from "@/components/ModuleCard";
import PageCard from "@/components/common/PageCard";

import pmsModules from "@/data/pmsModules";

const PMSPage = () => {
  return (
    <PageCard>
      <div className="rounded-3xl bg-gradient-to-r from-cyan-600 to-blue-700 p-8 text-white shadow-lg">
        <div className="flex items-center gap-4">
          <div className="rounded-2xl bg-white/20 p-4">
            <Wrench className="h-10 w-10" />
          </div>

          <div>
            <h1 className="text-3xl font-bold">Preventive Maintenance</h1>

            <p className="mt-2 text-cyan-100">
              Execute, monitor and manage preventive maintenance activities.
            </p>
          </div>
        </div>
      </div>

      <section className="mt-8">
        <h2 className="mb-6 text-2xl font-semibold">PMS Modules</h2>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {pmsModules.map((module) => (
            <ModuleCard key={module.id} module={module} />
          ))}
        </div>
      </section>
    </PageCard>
  );
};

export default PMSPage;
