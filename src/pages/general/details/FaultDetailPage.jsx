import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { getFaultById } from "@/api/fault.api";
import { getJobCards } from "@/api/jobCard.api";
import PageCard from "@/components/common/PageCard";
import LoadingSkeleton from "@/components/common/LoadingSkeleton";
import EmptyState from "@/components/common/EmptyState";
import RecordDetailCard from "@/components/common/RecordDetailCard";
import StatusBadge from "@/components/common/StatusBadge";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { showToast } from "../../../lib/toast";

const FaultDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [fault, setFault] = useState(null);
  const [jobCards, setJobCards] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [faultRes, jobCardsRes] = await Promise.all([
          getFaultById(id),
          getJobCards(),
        ]);
        setFault(faultRes?.data || null);
        setJobCards(
          (jobCardsRes?.data || []).filter((jc) => jc.faultId === Number(id)),
        );
      } catch (error) {
        showToast.error(
          error?.response?.data?.message || "Failed to load fault.",
        );
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [id]);

  if (isLoading) return <LoadingSkeleton />;
  if (!fault)
    return (
      <PageCard>
        <p className="text-muted-foreground">Fault not found.</p>
      </PageCard>
    );

  return (
    <PageCard>
      <Button
        variant="ghost"
        className="mb-4"
        onClick={() => navigate("/general/fault")}
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Faults
      </Button>

      <RecordDetailCard
        title={fault.faultName}
        status={fault.isActive ? "Active" : "Inactive"}
        fields={[{ label: "Machine", value: fault.machineName }]}
      />

      <h3 className="text-sm font-semibold mb-3">
        Job Cards Raised for This Fault
      </h3>
      {jobCards.length === 0 ? (
        <EmptyState
          title="No job cards yet"
          description="No job card has referenced this fault."
        />
      ) : (
        <div className="rounded-xl border overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-muted">
              <tr>
                <th className="text-left p-3">Job Card #</th>
                <th className="text-left p-3">Machine</th>
                <th className="text-left p-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {jobCards.map((jc) => (
                <tr key={jc.id} className="border-t">
                  <td className="p-3">{jc.jobCardNo}</td>
                  <td className="p-3">{jc.machineName || "-"}</td>
                  <td className="p-3">
                    <StatusBadge status={jc.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </PageCard>
  );
};

export default FaultDetailPage;
