import { Gauge } from "lucide-react";

import ModuleCard from "@/components/ModuleCard";
import PageCard from "@/components/common/PageCard";

import calibrationModules from "@/data/calibrationModules";

const CalibrationPage = () => {
  return (
    <PageCard>
      <div className="rounded-3xl bg-gradient-to-r from-teal-600 to-cyan-700 p-8 text-white shadow-lg">
        <div className="flex items-center gap-4">
          <div className="rounded-2xl bg-white/20 p-4">
            <Gauge className="h-10 w-10" />
          </div>

          <div>
            <h1 className="text-3xl font-bold">Calibration Management</h1>

            <p className="mt-2 text-cyan-100">
              Manage calibration schedules, certificates, compliance and
              equipment accuracy.
            </p>
          </div>
        </div>
      </div>

      <section className="mt-8">
        <h2 className="mb-6 text-2xl font-semibold">Calibration Modules</h2>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {calibrationModules.map((module) => (
            <ModuleCard key={module.id} module={module} />
          ))}
        </div>
      </section>
    </PageCard>
  );
};

export default CalibrationPage;
