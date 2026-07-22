import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getPmsById } from "@/api/pms.api";
import PageCard from "@/components/common/PageCard";
import LoadingSkeleton from "@/components/common/LoadingSkeleton";
import EmptyState from "@/components/common/EmptyState";
import RecordDetailCard from "@/components/common/RecordDetailCard";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft } from "lucide-react";
import { showToast } from "@/lib/showToast";

const PmsDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pms, setPms] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPms = async () => {
      try {
        const response = await getPmsById(id);
        setPms(response?.data || null);
      } catch (error) {
        showToast.error(
          error?.response?.data?.message || "Failed to load PMS record.",
        );
      } finally {
        setIsLoading(false);
      }
    };
    fetchPms();
  }, [id]);

  if (isLoading) return <LoadingSkeleton />;
  if (!pms)
    return (
      <PageCard>
        <p className="text-muted-foreground">PMS record not found.</p>
      </PageCard>
    );

  return (
    <PageCard>
      <Button variant="ghost" className="mb-4" onClick={() => navigate("/pms")}>
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to PMS
      </Button>

      <RecordDetailCard
        title={pms.machineName}
        status={pms.status}
        fields={[
          { label: "Start Date", value: pms.startDate },
          { label: "End Date", value: pms.endDate },
          { label: "Remarks", value: pms.remarks },
        ]}
      />

      <Tabs defaultValue="job">
        <TabsList className="flex-wrap h-auto">
          <TabsTrigger value="job">PMS Job</TabsTrigger>
          <TabsTrigger value="pending-checks">Pending Checks</TabsTrigger>
          <TabsTrigger value="defect">PMS Defect</TabsTrigger>
          <TabsTrigger value="technicians">PMS Technicians</TabsTrigger>
          <TabsTrigger value="reminder">Reminder</TabsTrigger>
          <TabsTrigger value="items">Items Used</TabsTrigger>
        </TabsList>

        {[
          "job",
          "pending-checks",
          "defect",
          "technicians",
          "reminder",
          "items",
        ].map((tab) => (
          <TabsContent key={tab} value={tab} className="pt-4">
            <EmptyState
              title="Not available yet"
              description="This sub-module hasn't been built on the backend yet."
            />
          </TabsContent>
        ))}
      </Tabs>
    </PageCard>
  );
};

export default PmsDetailPage;
