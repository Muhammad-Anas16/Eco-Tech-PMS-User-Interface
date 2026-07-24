import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { getPmsRecords, updatePms, deletePms, createPms } from "@/api/pms.api";
import { getPmsColumns } from "@/components/pms/pmsColumns";
import PmsForm from "@/components/pms/PmsForm";

import PageCard from "@/components/common/PageCard";
import PageToolbar from "@/components/common/PageToolbar";
import DataTablePage from "@/components/common/DataTablePage";
import CrudFormDialog from "@/components/common/CrudFormDialog";
import DeleteConfirmDialog from "@/components/common/DeleteConfirmDialog";
import EmptyState from "@/components/common/EmptyState";
import LoadingSkeleton from "@/components/common/LoadingSkeleton";
import { showToast } from "@/lib/toast";

// showAdd: true = "Active PMS" page pe naya record bhi bana sakte hain
// baaki filtered pages (Assigned/InProgress/Completed/etc) sirf view/edit/delete/status karengi
const PmsFilterList = ({
  title,
  description,
  filterFn,
  emptyText,
  showAdd = false,
  onAddFunction,
}) => {
  const navigate = useNavigate();
  const [records, setRecords] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [formOpen, setFormOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const handleView = (r) => navigate(`/pms/detail/${r.id}`);
  const handleAddNew = () => {
    setSelected(null);
    setFormOpen(true);
  };
  const handleEdit = (r) => {
    setSelected(r);
    setFormOpen(true);
  };
  const handleDeleteClick = (r) => {
    setToDelete(r);
    setDeleteOpen(true);
  };

  const handleStatusChange = async (record, newStatus) => {
    try {
      await updatePms(record.id, { ...record, status: newStatus });
      showToast.success("Status updated.");
      fetchRecords();
    } catch (error) {
      showToast.error(
        error?.response?.data?.message || "Failed to update status.",
      );
    }
  };

  const handleFormSubmit = async (formData) => {
    setIsSubmitting(true);
    try {
      if (selected) {
        await updatePms(selected.id, formData);
        showToast.success("PMS record updated successfully.");
      } else {
        await createPms(formData);
        showToast.success("PMS record created successfully.");
      }
      setFormOpen(false);
      fetchRecords();
    } catch (error) {
      showToast.error(
        error?.response?.data?.message || "Something went wrong.",
      );
    } finally {
      setIsSubmitting(false);
    }
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
    onStatusChange: handleStatusChange,
  });

  return (
    <PageCard>
      <PageToolbar
        title={title}
        description={description}
        actionLabel={showAdd ? "Add PMS Record" : undefined}
        onAction={showAdd ? handleAddNew : undefined}
        onAdd={() => onAddFunction()}
      />

      {isLoading ? (
        <LoadingSkeleton />
      ) : records.length === 0 ? (
        <EmptyState
          title={emptyText}
          description="Nothing to show here right now."
          actionLabel={showAdd ? "Add PMS Record" : undefined}
          onAction={showAdd ? handleAddNew : undefined}
        />
      ) : (
        <DataTablePage
          columns={columns}
          data={records}
          searchKey="machineName"
          onRowClick={handleView}
        />
      )}

      <CrudFormDialog
        open={formOpen}
        onOpenChange={setFormOpen}
        title={selected ? "Edit PMS Record" : "Add PMS Record"}
        description={
          selected
            ? "Update PMS details below."
            : "Fill in the details to log a new PMS job."
        }
      >
        <PmsForm
          defaultValues={selected || undefined}
          onSubmit={handleFormSubmit}
          isSubmitting={isSubmitting}
        />
      </CrudFormDialog>

      <DeleteConfirmDialog
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        title="Delete PMS Record?"
        description="Are you sure you want to delete this PMS record? This action cannot be undone."
        onConfirm={handleConfirmDelete}
        isDeleting={isDeleting}
      />
    </PageCard>
  );
};

export default PmsFilterList;
