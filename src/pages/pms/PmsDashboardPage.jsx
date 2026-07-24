import { useEffect, useState } from "react";

import { getPmsRecords } from "@/api/pms.api";
import { showToast } from "@/lib/toast";

import PageCard from "@/components/common/PageCard";
import PageToolbar from "@/components/common/PageToolbar";
import LoadingSkeleton from "@/components/common/LoadingSkeleton";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router";

const PmsDashboardPage = () => {
  const navigate = useNavigate();
  const [records, setRecords] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const response = await getPmsRecords();
        setRecords(response?.data || []);
      } catch (error) {
        showToast.error(
          error?.response?.data?.message || "Failed to load PMS records.",
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecords();
  }, []);

  if (isLoading) {
    return <LoadingSkeleton />;
  }

  const counts = {
    "New Job": records.filter((r) => r.status === "New Job").length,
    "In-Progress": records.filter((r) => r.status === "In-Progress").length,
    "Pending Verification": records.filter(
      (r) => r.status === "Pending Verification",
    ).length,
    Completed: records.filter((r) => r.status === "Completed").length,
  };

  return (
    <PageCard>
      <PageToolbar
        title="PMS Dashboard"
        description="Quick overview of all PMS jobs"
        onAdd={() => navigate("/pms/create")}
      />

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {Object.entries(counts).map(([label, count]) => (
          <Card key={label} className="rounded-xl shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {label}
              </CardTitle>
            </CardHeader>

            <CardContent>
              <p className="text-3xl font-bold">{count}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </PageCard>
  );
};

export default PmsDashboardPage;
