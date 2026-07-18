import { Hammer } from "lucide-react";

import ModuleCard from "@/components/ModuleCard";
import PageCard from "@/components/common/PageCard";

import toolManagementModules from "@/data/toolManagementModules";

const ToolsManagementPage = () => {
  return (
    <PageCard>
      <div className="rounded-3xl bg-gradient-to-r from-stone-600 to-slate-800 p-8 text-white shadow-lg">
        <div className="flex items-center gap-4">
          <div className="rounded-2xl bg-white/20 p-4">
            <Hammer className="h-10 w-10" />
          </div>

          <div>
            <h1 className="text-3xl font-bold">Tools Management</h1>

            <p className="mt-2 text-slate-200">
              Manage tool inventory, issue & return, maintenance, calibration
              and lifecycle.
            </p>
          </div>
        </div>
      </div>

      <section className="mt-8">
        <h2 className="mb-6 text-2xl font-semibold">
          Tools Management Modules
        </h2>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {toolManagementModules.map((module) => (
            <ModuleCard key={module.id} module={module} />
          ))}
        </div>
      </section>
    </PageCard>
  );
};

export default ToolsManagementPage;
