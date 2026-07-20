import { useEffect, useState } from "react";
import {
  getFaults,
  createFault,
  updateFault,
  deleteFault,
} from "@/api/fault.api";
import { getFaultColumns } from "@/components/fault/faultColumns";
import FaultForm from "@/components/fault/FaultForm";
import PageCard from "@/components/common/PageCard";
import PageToolbar from "@/components/common/PageToolbar";
import DataTablePage from "@/components/common/DataTablePage";
import CrudFormDialog from "@/components/common/CrudFormDialog";
import DeleteConfirmDialog from "@/components/common/DeleteConfirmDialog";
import EmptyState from "@/components/common/EmptyState";
import LoadingSkeleton from "@/components/common/LoadingSkeleton";
import { showToast } from "../../lib/toast";

const FaultPage = () => {
  const [faults, setFaults] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [formOpen, setFormOpen] = useState(false);
  const [selectedFault, setSelectedFault] = useState(null); // null = create mode
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [deleteOpen, setDeleteOpen] = useState(false);
  const [faultToDelete, setFaultToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // ===========================
  // Fetch all faults
  // ===========================
  const fetchFaults = async () => {
    setIsLoading(true);
    try {
      const response = await getFaults();
      setFaults(response?.data || []);
    } catch (error) {
      showToast.error(
        error?.response?.data?.message || "Failed to load faults.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchFaults();
  }, []);

  // ===========================
  // Create / Edit handlers
  // ===========================
  const handleAddNew = () => {
    setSelectedFault(null);
    setFormOpen(true);
  };

  const handleEdit = (fault) => {
    setSelectedFault(fault);
    setFormOpen(true);
  };

  const handleFormSubmit = async (formData) => {
    setIsSubmitting(true);
    try {
      if (selectedFault) {
        await updateFault(selectedFault.id, formData);
        showToast.success("Fault updated successfully.");
      } else {
        await createFault(formData);
        showToast.success("Fault created successfully.");
      }

      setFormOpen(false);
      fetchFaults();
    } catch (error) {
      showToast.error(
        error?.response?.data?.message || "Something went wrong.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // ===========================
  // Delete handlers
  // ===========================
  const handleDeleteClick = (fault) => {
    setFaultToDelete(fault);
    setDeleteOpen(true);
  };

  const handleConfirmDelete = async () => {
    setIsDeleting(true);
    try {
      await deleteFault(faultToDelete.id);
      showToast.success("Fault deleted successfully.");
      setDeleteOpen(false);
      fetchFaults();
    } catch (error) {
      showToast.error(
        error?.response?.data?.message || "Failed to delete fault.",
      );
    } finally {
      setIsDeleting(false);
    }
  };

  const columns = getFaultColumns({
    onEdit: handleEdit,
    onDelete: handleDeleteClick,
  });

  return (
    <PageCard>
      <PageToolbar
        title="Faults"
        description="Manage fault types linked to machines"
        actionLabel="Add Fault"
        loading={isLoading}
        onRefresh={fetchFaults}
        onAdd={() => {
          // console.log("Add Location Clicked");
          handleAddNew();
        }}
      />

      {isLoading ? (
        <LoadingSkeleton />
      ) : faults.length === 0 ? (
        <EmptyState
          title="No faults yet"
          description="Get started by adding your first fault."
          actionLabel="Add Fault"
          onAction={handleAddNew}
        />
      ) : (
        <DataTablePage columns={columns} data={faults} searchKey="faultName" />
      )}

      {/* Create/Edit Dialog */}
      <CrudFormDialog
        open={formOpen}
        onOpenChange={setFormOpen}
        title={selectedFault ? "Edit Fault" : "Add Fault"}
        description={
          selectedFault
            ? "Update fault details below."
            : "Fill in the details to add a new fault."
        }
      >
        <FaultForm
          defaultValues={selectedFault || undefined}
          onSubmit={handleFormSubmit}
          isSubmitting={isSubmitting}
        />
      </CrudFormDialog>

      {/* Delete Confirm Dialog */}
      <DeleteConfirmDialog
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        title="Delete Fault?"
        description={`Are you sure you want to delete "${faultToDelete?.faultName}"? This action cannot be undone.`}
        onConfirm={handleConfirmDelete}
        isDeleting={isDeleting}
      />
    </PageCard>
  );
};

export default FaultPage;
