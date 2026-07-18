// import { useEffect, useState } from "react";
// import { getDashboard } from "@/api/dashboard.api";
// import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
// import LoadingSkeleton from "@/components/common/LoadingSkeleton";
// import EmptyState from "@/components/common/EmptyState";
// import { showToast } from "../lib/toast";

// const DashboardPage = () => {
//   const [summary, setSummary] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);

//   const fetchDashboard = async () => {
//     setIsLoading(true);
//     try {
//       const response = await getDashboard();
//       setSummary(response?.data || null);
//     } catch (error) {
//       showToast.error(
//         error?.response?.data?.message || "Failed to load dashboard.",
//       );
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchDashboard();
//   }, []);

//   if (isLoading) return <LoadingSkeleton />;

//   if (!summary) {
//     return (
//       <EmptyState
//         title="No dashboard data"
//         description="Dashboard summary is not available right now."
//       />
//     );
//   }
//   const summaryEntries = Object.entries(summary).filter(
//     ([, value]) => typeof value === "number" || typeof value === "string",
//   );

//   return (
//     <div className="space-y-6">
//       <div>
//         <h1 className="text-2xl font-semibold">Dashboard</h1>
//         <p className="text-muted-foreground">
//           Overview of your plant maintenance system
//         </p>
//       </div>

//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
//         {summaryEntries.map(([key, value]) => (
//           <Card key={key} className="rounded-xl shadow-sm">
//             <CardHeader className="pb-2">
//               <CardTitle className="text-sm font-medium text-muted-foreground capitalize">
//                 {key.replace(/([A-Z])/g, " $1")}
//               </CardTitle>
//             </CardHeader>
//             <CardContent>
//               <div className="text-2xl font-bold">{value}</div>
//             </CardContent>
//           </Card>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default DashboardPage;

import { useEffect, useState } from "react";
import {
  Activity,
  AlertTriangle,
  Boxes,
  CheckCircle2,
  ClipboardList,
  Package,
  Wrench,
  CalendarDays,
} from "lucide-react";

import { getDashboard } from "@/api/dashboard.api";

import { Card, CardContent } from "@/components/ui/card";
import LoadingSkeleton from "@/components/common/LoadingSkeleton";
import EmptyState from "@/components/common/EmptyState";
import { showToast } from "@/lib/toast";

const icons = {
  totalMachines: Boxes,
  totalAssets: Package,
  totalInventory: Package,
  totalFaults: AlertTriangle,
  activeFaults: AlertTriangle,
  totalJobRequests: ClipboardList,
  totalJobs: Wrench,
  completedJobs: CheckCircle2,
  pendingJobs: Activity,
  upcomingPM: CalendarDays,
};

const DashboardPage = () => {
  const [summary, setSummary] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchDashboard = async () => {
    setIsLoading(true);

    try {
      const response = await getDashboard();
      setSummary(response?.data || null);
    } catch (error) {
      showToast.error(
        error?.response?.data?.message || "Failed to load dashboard.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  if (isLoading) return <LoadingSkeleton />;

  if (!summary) {
    return (
      <EmptyState
        title="Dashboard is empty"
        description="No summary information available."
      />
    );
  }

  const summaryEntries = Object.entries(summary).filter(
    ([, value]) => typeof value === "number" || typeof value === "string",
  );

  return (
    <div className="space-y-8">
      {/* Hero */}

      <div className="rounded-3xl border bg-gradient-to-r from-sky-600 to-cyan-600 p-8 text-white shadow-lg">
        <h1 className="text-3xl font-bold">Plant Maintenance Dashboard</h1>

        <p className="mt-2 text-sky-100">
          Monitor machines, maintenance, inventory and job activities.
        </p>
      </div>

      {/* Statistics */}

      <section>
        <h2 className="text-xl font-semibold mb-4">System Overview</h2>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
          {summaryEntries.map(([key, value]) => {
            const Icon = icons[key] || Activity;

            return (
              <Card
                key={key}
                className="rounded-2xl hover:shadow-lg transition-all"
              >
                <CardContent className="p-6 flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground capitalize">
                      {key.replace(/([A-Z])/g, " $1")}
                    </p>

                    <h3 className="mt-2 text-3xl font-bold">{value}</h3>
                  </div>

                  <div className="rounded-xl bg-sky-100 p-3">
                    <Icon className="h-7 w-7 text-sky-600" />
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Placeholder Grid */}

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="rounded-2xl">
          <CardContent className="p-6">
            <h3 className="font-semibold text-lg mb-2">Recent Job Requests</h3>

            <p className="text-muted-foreground">
              Recent maintenance requests will appear here.
            </p>
          </CardContent>
        </Card>

        <Card className="rounded-2xl">
          <CardContent className="p-6">
            <h3 className="font-semibold text-lg mb-2">
              Upcoming Preventive Maintenance
            </h3>

            <p className="text-muted-foreground">
              Scheduled PM activities will appear here.
            </p>
          </CardContent>
        </Card>

        <Card className="rounded-2xl">
          <CardContent className="p-6">
            <h3 className="font-semibold text-lg mb-2">Machine Health</h3>

            <p className="text-muted-foreground">
              Machine status charts will be displayed here.
            </p>
          </CardContent>
        </Card>

        <Card className="rounded-2xl">
          <CardContent className="p-6">
            <h3 className="font-semibold text-lg mb-2">Inventory Summary</h3>

            <p className="text-muted-foreground">
              Inventory statistics and low stock alerts.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardPage;
