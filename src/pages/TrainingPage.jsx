import { GraduationCap } from "lucide-react";

import ModuleCard from "@/components/ModuleCard";
import PageCard from "@/components/common/PageCard";

import trainingModules from "@/data/trainingModules";

const TrainingPage = () => {
  return (
    <PageCard>
      <div className="rounded-3xl bg-gradient-to-r from-violet-600 to-purple-700 p-8 text-white shadow-lg">
        <div className="flex items-center gap-4">
          <div className="rounded-2xl bg-white/20 p-4">
            <GraduationCap className="h-10 w-10" />
          </div>

          <div>
            <h1 className="text-3xl font-bold">Training Management</h1>

            <p className="mt-2 text-violet-100">
              Manage employee training programs, certifications, schedules and
              compliance records.
            </p>
          </div>
        </div>
      </div>

      <section className="mt-8">
        <h2 className="mb-6 text-2xl font-semibold">Training Modules</h2>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {trainingModules.map((module) => (
            <ModuleCard key={module.id} module={module} />
          ))}
        </div>
      </section>
    </PageCard>
  );
};

export default TrainingPage;
