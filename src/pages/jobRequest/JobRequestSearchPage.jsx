import { useEffect, useState } from "react";
import { getJobRequests } from "@/api/jobRequest.api";
import { getJobRequestColumns } from "@/components/jobRequest/jobRequestColumns";
import PageCard from "@/components/common/PageCard";
import PageToolbar from "@/components/common/PageToolbar";
import DataTablePage from "@/components/common/DataTablePage";
import EmptyState from "@/components/common/EmptyState";
import LoadingSkeleton from "@/components/common/LoadingSkeleton";
import { showToast } from "../../lib/toast";

const JobRequestSearchPage = () => {
  const [requests, setRequests] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchRequests = async () => {
    try {
      const response = await getJobRequests();
      setRequests(response?.data || []);
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
  }, []);

  // DataTablePage ke apne search box (searchKey) se hi search ho jayega
  const columns = getJobRequestColumns({
    onEdit: () => showToast.error("Edit from the All Job Requests page."),
    onDelete: () => showToast.error("Delete from the All Job Requests page."),
    onStatusChange: () => {},
  });

  if (isLoading) return <LoadingSkeleton />;

  return (
    <PageCard>
      <PageToolbar
        title="Search Requests"
        description="Search across all job requests"
        loading={isLoading}
        onRefresh={fetchRequests}
      />

      {requests.length === 0 ? (
        <EmptyState
          title="No job requests to search"
          description="Create a job request first."
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

export default JobRequestSearchPage;
