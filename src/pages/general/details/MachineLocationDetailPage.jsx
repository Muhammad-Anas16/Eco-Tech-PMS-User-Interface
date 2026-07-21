import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { getMachineLocationById } from "@/api/machineLocation.api";
import PageCard from "@/components/common/PageCard";
import LoadingSkeleton from "@/components/common/LoadingSkeleton";
import RecordDetailCard from "@/components/common/RecordDetailCard";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { showToast } from "../../../lib/toast";

const MachineLocationDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [location, setLocation] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const response = await getMachineLocationById(id);
        setLocation(response?.data || null);
      } catch (error) {
        showToast.error(
          error?.response?.data?.message || "Failed to load location.",
        );
      } finally {
        setIsLoading(false);
      }
    };
    fetchLocation();
  }, [id]);

  if (isLoading) return <LoadingSkeleton />;
  if (!location)
    return (
      <PageCard>
        <p className="text-muted-foreground">Location not found.</p>
      </PageCard>
    );

  return (
    <PageCard>
      <Button
        variant="ghost"
        className="mb-4"
        onClick={() => navigate("/general/machine-location")}
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Machine Locations
      </Button>

      <RecordDetailCard
        title={location.locationName}
        subtitle={location.locationCode}
        fields={[{ label: "Machine", value: location.machineName }]}
      />
    </PageCard>
  );
};

export default MachineLocationDetailPage;
