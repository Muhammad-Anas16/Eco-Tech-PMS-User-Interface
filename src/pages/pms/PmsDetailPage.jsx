import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { getPmsById } from "@/api/pms.api";
import PageCard from "@/components/common/PageCard";
import LoadingSkeleton from "@/components/common/LoadingSkeleton";
import RecordDetailCard from "@/components/common/RecordDetailCard";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { showToast } from "@/lib/toast";

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
        showToast.error(error?.response?.data?.message || "Failed to load PMS record.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchPms();
  }, [id]);

  if (isLoading) return <LoadingSkeleton />;
  if (!pms) return <PageCard><p className="text-muted-foreground">PMS record not found.</p></PageCard>;

  return (
    <PageCard>
      <Button variant="ghost" className="mb-4" onClick={() => navigate("/pms/active")}>
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to PMS
      </Button>

      <RecordDetailCard
        title={pms.machineName}
        status={pms.status}
        fields={[
          { label: "Technician", value: pms.technicianName || "Unassigned" },
          { label: "Start Date", value: pms.startDate },
          { label: "End Date", value: pms.endDate },
          { label: "Remarks", value: pms.remarks },
        ]}
      />
    </PageCard>
  );
};
export default PmsDetailPage;