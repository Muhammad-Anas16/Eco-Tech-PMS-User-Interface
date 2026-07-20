import { useEffect, useState } from "react";
import {
  getJobCardTechnicians,
  assignTechnicianToJobCard,
  removeJobCardTechnician,
} from "@/api/jobCard.api";
import { getTechnicians } from "@/api/technician.api";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Trash2 } from "lucide-react";
import { showToast } from "@/lib/showToast";
import LoadingSkeleton from "@/components/common/LoadingSkeleton";

// jobCardId: parent (JobCardDetailPage) se aata hai
const JobCardTechnicians = ({ jobCardId }) => {
  const [assigned, setAssigned] = useState([]);
  const [technicians, setTechnicians] = useState([]);
  const [selectedTech, setSelectedTech] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isAssigning, setIsAssigning] = useState(false);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const [assignedRes, techniciansRes] = await Promise.all([
        getJobCardTechnicians(jobCardId),
        getTechnicians(),
      ]);
      setAssigned(assignedRes?.data || []);
      setTechnicians(techniciansRes?.data || []);
    } catch (error) {
      showToast.error(
        error?.response?.data?.message || "Failed to load technicians.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [jobCardId]);

  const handleAssign = async () => {
    if (!selectedTech) {
      showToast.error("Please select a technician first.");
      return;
    }

    setIsAssigning(true);
    try {
      await assignTechnicianToJobCard(jobCardId, Number(selectedTech));
      showToast.success("Technician assigned.");
      setSelectedTech("");
      fetchData();
    } catch (error) {
      showToast.error(
        error?.response?.data?.message || "Failed to assign technician.",
      );
    } finally {
      setIsAssigning(false);
    }
  };

  const handleRemove = async (assignmentId) => {
    try {
      await removeJobCardTechnician(assignmentId);
      showToast.success("Technician removed.");
      fetchData();
    } catch (error) {
      showToast.error(
        error?.response?.data?.message || "Failed to remove technician.",
      );
    }
  };

  if (isLoading) return <LoadingSkeleton />;

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <Select value={selectedTech} onValueChange={setSelectedTech}>
          <SelectTrigger className="w-[250px]">
            <SelectValue placeholder="Select technician to assign" />
          </SelectTrigger>
          <SelectContent>
            {technicians.map((t) => (
              <SelectItem key={t.id} value={String(t.id)}>
                {t.techName} ({t.techCode})
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button onClick={handleAssign} disabled={isAssigning}>
          {isAssigning ? "Assigning..." : "Assign"}
        </Button>
      </div>

      {assigned.length === 0 ? (
        <p className="text-sm text-muted-foreground">
          No technicians assigned yet.
        </p>
      ) : (
        <div className="space-y-2">
          {assigned.map((a) => (
            <div
              key={a.id}
              className="flex items-center justify-between rounded-lg border p-3"
            >
              <span>
                {a.techName}{" "}
                <span className="text-muted-foreground">({a.techCode})</span>
              </span>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleRemove(a.id)}
              >
                <Trash2 className="h-4 w-4 text-destructive" />
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default JobCardTechnicians;
