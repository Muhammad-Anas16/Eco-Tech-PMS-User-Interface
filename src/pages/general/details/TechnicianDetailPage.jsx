import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { getTechnicianById } from "@/api/technician.api";
import PageCard from "@/components/common/PageCard";
import LoadingSkeleton from "@/components/common/LoadingSkeleton";
import EmptyState from "@/components/common/EmptyState";
import RecordDetailCard from "@/components/common/RecordDetailCard";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { showToast } from "../../../lib/toast";

const TechnicianDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [technician, setTechnician] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTechnician = async () => {
      try {
        const response = await getTechnicianById(id);
        setTechnician(response?.data || null);
      } catch (error) {
        showToast.error(
          error?.response?.data?.message || "Failed to load technician.",
        );
      } finally {
        setIsLoading(false);
      }
    };
    fetchTechnician();
  }, [id]);

  if (isLoading) return <LoadingSkeleton />;
  if (!technician)
    return (
      <PageCard>
        <p className="text-muted-foreground">Technician not found.</p>
      </PageCard>
    );

  return (
    <PageCard>
      <Button
        variant="ghost"
        className="mb-4"
        onClick={() => navigate("/general/technician")}
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Technicians
      </Button>

      <RecordDetailCard
        title={technician.techName}
        subtitle={technician.techCode}
        status={technician.isActive ? "Active" : "Inactive"}
        fields={[
          { label: "Designation", value: technician.techDesignation },
          { label: "Cell No", value: technician.cellNo },
          { label: "Employee Code", value: technician.employeeCode },
          { label: "Plant", value: technician.plantName },
          { label: "Type", value: technician.type },
        ]}
      />
      <EmptyState
        title="Assigned job cards — coming soon"
        description="A reverse lookup endpoint (technician → job cards) needs to be added on the backend first."
      />
    </PageCard>
  );
};

export default TechnicianDetailPage;
