import { ClipboardList } from "lucide-react";

import PageCard from "@/components/common/PageCard";
import ModuleCard from "@/components/ModuleCard";

import jobRequestModules from "@/data/jobRequestModules";

const JobRequestPage = () => {
  return (
    <PageCard>
      <div className="rounded-3xl bg-gradient-to-r from-amber-500 to-orange-600 p-8 text-white shadow-lg">
        <div className="flex items-center gap-4">
          <div className="rounded-2xl bg-white/20 p-4">
            <ClipboardList className="h-10 w-10" />
          </div>

          <div>
            <h1 className="text-3xl font-bold">Job Request Management</h1>

            <p className="mt-2 text-orange-100">
              Create, approve, monitor and manage maintenance job requests.
            </p>
          </div>
        </div>
      </div>

      <section className="mt-8">
        <h2 className="mb-6 text-2xl font-semibold">Job Request Modules</h2>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {jobRequestModules.map((module) => (
            <ModuleCard key={module.id} module={module} />
          ))}
        </div>
      </section>
    </PageCard>
  );
};

export default JobRequestPage;
