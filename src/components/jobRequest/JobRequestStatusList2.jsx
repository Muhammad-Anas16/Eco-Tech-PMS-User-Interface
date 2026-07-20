import { useEffect, useState } from "react";
import { getJobRequests, updateJobRequestStatus } from "@/api/jobRequest.api";
import { getJobRequestColumns } from "@/components/jobRequest/jobRequestColumns";
import PageCard from "@/components/common/PageCard";
import PageToolbar from "@/components/common/PageToolbar";
import DataTablePage from "@/components/common/DataTablePage";
import EmptyState from "@/components/common/EmptyState";
import LoadingSkeleton from "@/components/common/LoadingSkeleton";
import { showToast } from "@/lib/showToast";

// title/description/statusFilter/emptyText: parent page se aayenge
const JobRequestStatusList2 = ({
  title,
  description,
  statusFilter,
  emptyText,
}) => {
  const [requests, setRequests] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchRequests = async () => {
    setIsLoading(true);
    try {
      const response = await getJobRequests();
      const all = response?.data || [];
      // Client-side filter — backend abhi single list hi deta hai
      setRequests(
        statusFilter ? all.filter((r) => r.status === statusFilter) : all,
      );
    } catch (error) {
      showToast.error(
        error?.response?.data?.message || "Failed to load job requests.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, [statusFilter]);

  const handleStatusChange = async (request, newStatus) => {
    try {
      await updateJobRequestStatus(request.id, newStatus);
      showToast.success("Status updated.");
      fetchRequests();
    } catch (error) {
      showToast.error(
        error?.response?.data?.message || "Failed to update status.",
      );
    }
  };

  const columns = getJobRequestColumns({
    onEdit: () => showToast.error("Edit from the All Job Requests page."),
    onDelete: () => showToast.error("Delete from the All Job Requests page."),
    onStatusChange: handleStatusChange,
  });

  return (
    <PageCard>
      <PageToolbar title={title} description={description} />

      {isLoading ? (
        <LoadingSkeleton />
      ) : requests.length === 0 ? (
        <EmptyState
          title={emptyText}
          description="Nothing to show here right now."
        />
      ) : (
        <DataTablePage
          columns={columns}
          data={requests}
          searchKey="requestedByName"
        />
      )}
    </PageCard>
  );
};

export default JobRequestStatusList2;
