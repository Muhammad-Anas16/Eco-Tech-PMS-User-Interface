import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import {
  getJobRequests,
  updateJobRequest,
  updateJobRequestStatus,
  deleteJobRequest,
} from "@/api/jobRequest.api";
import { getJobRequestColumns } from "@/components/jobRequest/jobRequestColumns";
import JobRequestForm from "@/components/jobRequest/JobRequestForm";

import PageCard from "@/components/common/PageCard";
import PageToolbar from "@/components/common/PageToolbar";
import DataTablePage from "@/components/common/DataTablePage";
import CrudFormDialog from "@/components/common/CrudFormDialog";
import DeleteConfirmDialog from "@/components/common/DeleteConfirmDialog";
import EmptyState from "@/components/common/EmptyState";
import LoadingSkeleton from "@/components/common/LoadingSkeleton";
import { showToast } from "../../lib/toast";

const JobRequestListPage = () => {
  const navigate = useNavigate();

  const [requests, setRequests] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [formOpen, setFormOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [deleteOpen, setDeleteOpen] = useState(false);
  const [requestToDelete, setRequestToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchRequests = async () => {
    setIsLoading(true);
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

  const handleAddNew = () => navigate("/job-request/create");

  const handleEdit = (request) => {
    setSelectedRequest(request);
    setFormOpen(true);
  };

  const handleFormSubmit = async (formData) => {
    setIsSubmitting(true);
    try {
      await updateJobRequest(selectedRequest.id, formData);
      showToast.success("Job request updated successfully.");
      setFormOpen(false);
      fetchRequests();
    } catch (error) {
      showToast.error(
        error?.response?.data?.message || "Something went wrong.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

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

  const handleDeleteClick = (request) => {
    setRequestToDelete(request);
    setDeleteOpen(true);
  };

  const handleConfirmDelete = async () => {
    setIsDeleting(true);
    try {
      await deleteJobRequest(requestToDelete.id);
      showToast.success("Job request deleted successfully.");
      setDeleteOpen(false);
      fetchRequests();
    } catch (error) {
      showToast.error(
        error?.response?.data?.message || "Failed to delete job request.",
      );
    } finally {
      setIsDeleting(false);
    }
  };

  const columns = getJobRequestColumns({
    onEdit: handleEdit,
    onDelete: handleDeleteClick,
    onStatusChange: handleStatusChange,
  });

  return (
    <PageCard>
      <PageToolbar
        title="All Job Requests"
        description="Every job request raised so far"
        actionLabel="Add Job Request"
        onRefresh={fetchRequests}
        onAdd={() => {
          handleAddNew();
        }}
      />

      {isLoading ? (
        <LoadingSkeleton />
      ) : requests.length === 0 ? (
        <EmptyState
          title="No job requests yet"
          description="Get started by adding your first job request."
          actionLabel="Add Job Request"
          onAction={handleAddNew}
        />
      ) : (
        <DataTablePage
          columns={columns}
          data={requests}
          searchKey="requestedByName"
        />
      )}

      <CrudFormDialog
        open={formOpen}
        onOpenChange={setFormOpen}
        title="Edit Job Request"
        description="Update job request details below."
      >
        <JobRequestForm
          defaultValues={selectedRequest || undefined}
          onSubmit={handleFormSubmit}
          isSubmitting={isSubmitting}
        />
      </CrudFormDialog>

      <DeleteConfirmDialog
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        title="Delete Job Request?"
        description="Are you sure you want to delete this job request? This action cannot be undone."
        onConfirm={handleConfirmDelete}
        isDeleting={isDeleting}
      />
    </PageCard>
  );
};

export default JobRequestListPage;
