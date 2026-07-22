import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { getPmsSchedules, deletePmsSchedule } from "@/api/pmsSchedule.api";
import { getPmsScheduleColumns } from "@/components/pmsSchedule/pmsScheduleColumns";
import PageCard from "@/components/common/PageCard";
import PageToolbar from "@/components/common/PageToolbar";
import DataTablePage from "@/components/common/DataTablePage";
import DeleteConfirmDialog from "@/components/common/DeleteConfirmDialog";
import EmptyState from "@/components/common/EmptyState";
import LoadingSkeleton from "@/components/common/LoadingSkeleton";
import { showToast } from "../../lib/toast";

// title/description/filterFn/emptyText: parent page se aayenge
// filterFn: (schedule) => boolean — koi bhi custom condition
const PmsScheduleFilterList = ({
  title,
  description,
  filterFn,
  emptyText,
  searchKey = "machineName",
}) => {
  const navigate = useNavigate();
  const [schedules, setSchedules] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [toDelete, setToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchSchedules = async () => {
    setIsLoading(true);
    try {
      const response = await getPmsSchedules();
      const all = response?.data || [];
      setSchedules(filterFn ? all.filter(filterFn) : all);
    } catch (error) {
      showToast.error(
        error?.response?.data?.message || "Failed to load PMS schedules.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSchedules();
  }, []);

  const handleView = (s) => navigate(`/pms-schedule/${s.id}`);
  const handleEdit = (s) => navigate(`/pms-schedule/${s.id}`); // edit bhi detail page se ho sakta hai
  const handleDeleteClick = (s) => {
    setToDelete(s);
    setDeleteOpen(true);
  };

  const handleConfirmDelete = async () => {
    setIsDeleting(true);
    try {
      await deletePmsSchedule(toDelete.id);
      showToast.success("Schedule deleted successfully.");
      setDeleteOpen(false);
      fetchSchedules();
    } catch (error) {
      showToast.error(
        error?.response?.data?.message || "Failed to delete schedule.",
      );
    } finally {
      setIsDeleting(false);
    }
  };

  const columns = getPmsScheduleColumns({
    onView: handleView,
    onEdit: handleEdit,
    onDelete: handleDeleteClick,
  });

  return (
    <PageCard>
      <PageToolbar title={title} description={description} />

      {isLoading ? (
        <LoadingSkeleton />
      ) : schedules.length === 0 ? (
        <EmptyState
          title={emptyText}
          description="Nothing to show here right now."
        />
      ) : (
        <DataTablePage
          columns={columns}
          data={schedules}
          searchKey={searchKey}
          onRowClick={handleView}
        />
      )}

      <DeleteConfirmDialog
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        title="Delete Schedule?"
        description="Are you sure you want to delete this schedule? This action cannot be undone."
        onConfirm={handleConfirmDelete}
        isDeleting={isDeleting}
      />
    </PageCard>
  );
};

export default PmsScheduleFilterList;
