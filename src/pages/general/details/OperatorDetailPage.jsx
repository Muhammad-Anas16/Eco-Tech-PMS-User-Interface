import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { getOperatorById } from "@/api/operator.api";
import { getJobCards } from "@/api/jobCard.api";
import PageCard from "@/components/common/PageCard";
import LoadingSkeleton from "@/components/common/LoadingSkeleton";
import EmptyState from "@/components/common/EmptyState";
import RecordDetailCard from "@/components/common/RecordDetailCard";
import StatusBadge from "@/components/common/StatusBadge";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { showToast } from "../../../lib/toast";

const OperatorDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [operator, setOperator] = useState(null);
  const [jobCards, setJobCards] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [operatorRes, jobCardsRes] = await Promise.all([
          getOperatorById(id),
          getJobCards(),
        ]);
        setOperator(operatorRes?.data || null);
        // Client-side filter — backend abhi operator-wise job card endpoint nahi deta
        setJobCards(
          (jobCardsRes?.data || []).filter(
            (jc) => jc.operatorId === Number(id),
          ),
        );
      } catch (error) {
        showToast.error(
          error?.response?.data?.message || "Failed to load operator.",
        );
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [id]);

  if (isLoading) return <LoadingSkeleton />;
  if (!operator)
    return (
      <PageCard>
        <p className="text-muted-foreground">Operator not found.</p>
      </PageCard>
    );

  return (
    <PageCard>
      <Button
        variant="ghost"
        className="mb-4"
        onClick={() => navigate("/general/operator")}
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Operators
      </Button>

      <RecordDetailCard
        title={operator.operatorName}
        subtitle={operator.operatorCode}
        status={operator.isActive ? "Active" : "Inactive"}
        fields={[{ label: "Plant", value: operator.plantName }]}
      />

      <h3 className="text-sm font-semibold mb-3">
        Job Cards Involving This Operator
      </h3>
      {jobCards.length === 0 ? (
        <EmptyState
          title="No job cards yet"
          description="This operator hasn't been assigned to any job card."
        />
      ) : (
        <div className="rounded-xl border overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-muted">
              <tr>
                <th className="text-left p-3">Job Card #</th>
                <th className="text-left p-3">Machine</th>
                <th className="text-left p-3">Job Type</th>
                <th className="text-left p-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {jobCards.map((jc) => (
                <tr key={jc.id} className="border-t">
                  <td className="p-3">{jc.jobCardNo}</td>
                  <td className="p-3">{jc.machineName || "-"}</td>
                  <td className="p-3">{jc.jobType}</td>
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

export default OperatorDetailPage;
