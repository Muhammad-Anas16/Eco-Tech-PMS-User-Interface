import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { getJobCards, deleteJobCard } from "@/api/jobCard.api";
import { getWorkOrderColumns } from "@/components/workOrder/workOrderColumns";
import PageCard from "@/components/common/PageCard";
import PageToolbar from "@/components/common/PageToolbar";
import DataTablePage from "@/components/common/DataTablePage";
import DeleteConfirmDialog from "@/components/common/DeleteConfirmDialog";
import EmptyState from "@/components/common/EmptyState";
import LoadingSkeleton from "@/components/common/LoadingSkeleton";
import { showToast } from "../../lib/toast";
import { updateJobCardStatus } from "../../api/jobCard.api";

// Work Orders = Job Card backend hi hai, bas naam/UI alag hai
const WorkOrderFilterList = ({
  title,
  description,
  filterFn,
  emptyText,
  addFunction,
}) => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [toDelete, setToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchOrders = async () => {
    setIsLoading(true);
    try {
      const response = await getJobCards();
      console.log("Checking Response DataTable Line 32", response);
      const all = response?.data || [];
      setOrders(filterFn ? all.filter(filterFn) : all);
    } catch (error) {
      showToast.error(
        error?.response?.data?.message || "Failed to load work orders.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleView = (o) => navigate(`/job-cards/${o.id}`); // existing Job Card detail page reuse
  const handleDeleteClick = (o) => {
    setToDelete(o);
    setDeleteOpen(true);
  };

  const handleConfirmDelete = async () => {
    setIsDeleting(true);
    try {
      await deleteJobCard(toDelete.id);
      showToast.success("Work order deleted successfully.");
      setDeleteOpen(false);
      fetchOrders();
    } catch (error) {
      showToast.error(
        error?.response?.data?.message || "Failed to delete work order.",
      );
    } finally {
      setIsDeleting(false);
    }
  };

  const handleStatusChange = async (order, newStatus) => {
    try {
      await updateJobCardStatus(order.id, newStatus);
      showToast.success("Status updated.");
      fetchOrders();
    } catch (error) {
      showToast.error(
        error?.response?.data?.message || "Failed to update status.",
      );
    }
  };

  const columns = getWorkOrderColumns({
    onView: handleView,
    onDelete: handleDeleteClick,
    onStatusChange: handleStatusChange,
  });

  return (
    <PageCard>
      <PageToolbar
        title={title}
        description={description}
        onAdd={() => addFunction()}
      />

      {isLoading ? (
        <LoadingSkeleton />
      ) : orders.length === 0 ? (
        <EmptyState
          title={emptyText}
          description="Nothing to show here right now."
        />
      ) : (
        <DataTablePage
          columns={columns}
          data={orders}
          searchKey="jobCardNo"
          onRowClick={handleView}
        />
      )}

      <DeleteConfirmDialog
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        title="Delete Work Order?"
        description="Are you sure you want to delete this work order? This action cannot be undone."
        onConfirm={handleConfirmDelete}
        isDeleting={isDeleting}
      />
    </PageCard>
  );
};

export default WorkOrderFilterList;
