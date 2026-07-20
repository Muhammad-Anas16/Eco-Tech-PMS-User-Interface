import { useEffect, useState } from "react";
import { getJobRequests } from "@/api/jobRequest.api";
import { getJobRequestColumns } from "@/components/jobRequest/jobRequestColumns";
import PageCard from "@/components/common/PageCard";
import DataTablePage from "@/components/common/DataTablePage";
import EmptyState from "@/components/common/EmptyState";
import LoadingSkeleton from "@/components/common/LoadingSkeleton";
import { showToast } from "../../lib/toast";
import { RefreshCw } from "lucide-react";

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
  }, [requests]);

  // DataTablePage ke apne search box (searchKey) se hi search ho jayega
  const columns = getJobRequestColumns({
    onEdit: () => showToast.error("Edit from the All Job Requests page."),
    onDelete: () => showToast.error("Delete from the All Job Requests page."),
    onStatusChange: () => {},
  });

  if (isLoading) return <LoadingSkeleton />;

  return (
    <PageCard>
      <div className="flex flex-col gap-4 rounded-xl border bg-white p-6 shadow-sm md:flex-row md:items-center md:justify-between mb-5">
        <div className="flex flex-col items-center">
          <h2 className="text-2xl font-bold text-slate-900">Search Requests</h2>
          <p className="text-sm text-slate-500">
            Search across all job requests.
          </p>
        </div>

        <button className="inline-flex items-center gap-2 rounded-lg bg-black px-4 py-2 text-sm font-medium text-white transition-all duration-200 hover:bg-slate-800 active:scale-95">
          <RefreshCw className="h-4 w-4" />
          Refresh
        </button>
      </div>

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
