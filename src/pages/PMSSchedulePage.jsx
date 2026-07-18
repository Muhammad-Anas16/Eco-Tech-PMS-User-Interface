import { CalendarCog } from "lucide-react";

import ModuleCard from "@/components/ModuleCard";
import PageCard from "@/components/common/PageCard";

import pmsScheduleModules from "@/data/pmsScheduleModules";

const PMSSchedulePage = () => {
  return (
    <PageCard>
      <div className="rounded-3xl bg-gradient-to-r from-fuchsia-600 to-purple-700 p-8 text-white shadow-lg">
        <div className="flex items-center gap-4">
          <div className="rounded-2xl bg-white/20 p-4">
            <CalendarCog className="h-10 w-10" />
          </div>

          <div>
            <h1 className="text-3xl font-bold">PMS Schedule Management</h1>

            <p className="mt-2 text-purple-100">
              Plan, schedule and monitor preventive maintenance activities.
            </p>
          </div>
        </div>
      </div>

      <section className="mt-8">
        <h2 className="mb-6 text-2xl font-semibold">PMS Schedule Modules</h2>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {pmsScheduleModules.map((module) => (
            <ModuleCard key={module.id} module={module} />
          ))}
        </div>
      </section>
    </PageCard>
  );
};

export default PMSSchedulePage;
