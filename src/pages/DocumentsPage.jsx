import { FolderOpen } from "lucide-react";

import ModuleCard from "@/components/ModuleCard";
import PageCard from "@/components/common/PageCard";

import documentModules from "@/data/documentModules";

const DocumentsPage = () => {
  return (
    <PageCard>
      <div className="rounded-3xl bg-gradient-to-r from-yellow-500 to-amber-600 p-8 text-white shadow-lg">
        <div className="flex items-center gap-4">
          <div className="rounded-2xl bg-white/20 p-4">
            <FolderOpen className="h-10 w-10" />
          </div>

          <div>
            <h1 className="text-3xl font-bold">Document Management</h1>

            <p className="mt-2 text-yellow-100">
              Store, organize and manage manuals, drawings, certificates and
              technical documents.
            </p>
          </div>
        </div>
      </div>

      <section className="mt-8">
        <h2 className="mb-6 text-2xl font-semibold">Document Modules</h2>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {documentModules.map((module) => (
            <ModuleCard key={module.id} module={module} />
          ))}
        </div>
      </section>
    </PageCard>
  );
};

export default DocumentsPage;
