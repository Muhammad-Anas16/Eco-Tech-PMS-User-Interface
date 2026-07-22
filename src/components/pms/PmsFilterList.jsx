import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { getPmsRecords, deletePms } from "@/api/pms.api";
import { getPmsColumns } from "@/components/pms/pmsColumns";
import PageCard from "@/components/common/PageCard";
import PageToolbar from "@/components/common/PageToolbar";
import DataTablePage from "@/components/common/DataTablePage";
import DeleteConfirmDialog from "@/components/common/DeleteConfirmDialog";
import EmptyState from "@/components/common/EmptyState";
import LoadingSkeleton from "@/components/common/LoadingSkeleton";
import { showToast } from "../../lib/toast";

const PmsFilterList = ({ title, description, filterFn, emptyText }) => {
  const navigate = useNavigate();
  const [records, setRecords] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [toDelete, setToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchRecords = async () => {
    setIsLoading(true);
    try {
      const response = await getPmsRecords();
      const all = response?.data || [];
      setRecords(filterFn ? all.filter(filterFn) : all);
    } catch (error) {
      showToast.error(
        error?.response?.data?.message || "Failed to load PMS records.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRecords();
  }, []);

  const handleView = (r) => navigate(`/pms/${r.id}`);
  const handleEdit = (r) => navigate(`/pms/${r.id}`);
  const handleDeleteClick = (r) => {
    setToDelete(r);
    setDeleteOpen(true);
  };

  const handleConfirmDelete = async () => {
    setIsDeleting(true);
    try {
      await deletePms(toDelete.id);
      showToast.success("PMS record deleted successfully.");
      setDeleteOpen(false);
      fetchRecords();
    } catch (error) {
      showToast.error(
        error?.response?.data?.message || "Failed to delete PMS record.",
      );
    } finally {
      setIsDeleting(false);
    }
  };

  const columns = getPmsColumns({
    onView: handleView,
    onEdit: handleEdit,
    onDelete: handleDeleteClick,
  });

  return (
    <PageCard>
      <PageToolbar title={title} description={description} />

      {isLoading ? (
        <LoadingSkeleton />
      ) : records.length === 0 ? (
        <EmptyState
          title={emptyText}
          description="Nothing to show here right now."
        />
      ) : (
        <DataTablePage
          columns={columns}
          data={records}
          searchKey="machineName"
          onRowClick={handleView}
        />
      )}

      <DeleteConfirmDialog
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        title="Delete PMS Record?"
        description="Are you sure you want to delete this record? This action cannot be undone."
        onConfirm={handleConfirmDelete}
        isDeleting={isDeleting}
      />
    </PageCard>
  );
};

export default PmsFilterList;
