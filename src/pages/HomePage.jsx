// import Header from "@/components/Header";
// import ModuleCard from "@/components/ModuleCard";
// import modules from "@/data/modules";
// import HeroSection from "../components/HeroSection";

// const HomePage = () => {
//   return (
//     <div className="min-h-screen bg-slate-100">
//       <Header />
//       <main className="mx-auto max-w-7xl px-6 py-8">
//         {/* Hero */}
//         <HeroSection modules={modules} />
//         {/* Modules */}
//         <section>
//           <div className="mb-6 flex items-center justify-between">
//             <div>
//               <h2 className="text-2xl font-bold text-slate-800">
//                 System Modules
//               </h2>

//               <p className="mt-1 text-sm text-slate-500">
//                 Select a module to continue.
//               </p>
//             </div>
//           </div>

//           <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
//             {modules.map((module) => (
//               <ModuleCard key={module.id} module={module} />
//             ))}
//           </div>
//         </section>
//       </main>
//     </div>
//   );
// };

// export default HomePage;

import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ModuleCard from "@/components/ModuleCard";

import modules from "@/data/modules";

const HomePage = () => {
  return (
    <div className="min-h-screen bg-slate-100">
      <Header />

      <main className="mx-auto flex max-w-7xl flex-col gap-8 p-6 lg:p-8">
        {/* Hero Section */}

        <HeroSection modules={modules} />

        {/* Modules Section */}

        <section className="flex flex-col gap-6">
          <div className="flex flex-col gap-1">
            <h2 className="text-2xl font-bold tracking-tight text-slate-800">
              System Modules
            </h2>

            <p className="text-sm text-slate-500">
              Select a module to continue.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
            {modules.map((module) => (
              <ModuleCard key={module.id} module={module} />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default HomePage;
