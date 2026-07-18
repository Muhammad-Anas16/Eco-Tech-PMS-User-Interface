import { useEffect, useState } from "react";
import { getDashboard } from "@/api/dashboard.api";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import LoadingSkeleton from "@/components/common/LoadingSkeleton";
import EmptyState from "@/components/common/EmptyState";
import { showToast } from "../lib/toast";

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
        title="No dashboard data"
        description="Dashboard summary is not available right now."
      />
    );
  }

  // Backend jo bhi key-value pairs bhejta hai, unhe generically cards me dikha rahe hain.
  // Jab aap Inventory model bhej doge aur exact dashboard field names confirm honge,
  // isko named/typed cards (jaisa "Total Assets", "Total Inventory Items") me convert kar denge.
  const summaryEntries = Object.entries(summary).filter(
    ([, value]) => typeof value === "number" || typeof value === "string",
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Dashboard</h1>
        <p className="text-muted-foreground">
          Overview of your plant maintenance system
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {summaryEntries.map(([key, value]) => (
          <Card key={key} className="rounded-xl shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground capitalize">
                {key.replace(/([A-Z])/g, " $1")}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{value}</div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default DashboardPage;
