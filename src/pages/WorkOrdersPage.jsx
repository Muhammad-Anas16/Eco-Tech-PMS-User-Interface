import { ClipboardCheck } from "lucide-react";

import ModuleCard from "@/components/ModuleCard";
import PageCard from "@/components/common/PageCard";

import workOrderModules from "@/data/workOrderModules";

const WorkOrdersPage = () => {
  return (
    <PageCard>
      <div className="rounded-3xl bg-gradient-to-r from-orange-500 to-red-500 p-8 text-white shadow-lg">
        <div className="flex items-center gap-4">
          <div className="rounded-2xl bg-white/20 p-4">
            <ClipboardCheck className="h-10 w-10" />
          </div>

          <div>
            <h1 className="text-3xl font-bold">Work Order Management</h1>

            <p className="mt-2 text-orange-100">
              Create, assign, monitor and complete maintenance work orders.
            </p>
          </div>
        </div>
      </div>

      <section className="mt-8">
        <h2 className="mb-6 text-2xl font-semibold">Work Order Modules</h2>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {workOrderModules.map((module) => (
            <ModuleCard key={module.id} module={module} />
          ))}
        </div>
      </section>
    </PageCard>
  );
};

export default WorkOrdersPage;
