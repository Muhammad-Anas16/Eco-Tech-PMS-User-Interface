import { useEffect, useState } from "react";
import {
  getTechnicians,
  createTechnician,
  updateTechnician,
  deleteTechnician,
} from "@/api/technician.api";
import { getTechnicianColumns } from "@/components/technician/technicianColumns";
import TechnicianForm from "@/components/technician/TechnicianForm";

import PageCard from "@/components/common/PageCard";
import PageToolbar from "@/components/common/PageToolbar";
import DataTablePage from "@/components/common/DataTablePage";
import CrudFormDialog from "@/components/common/CrudFormDialog";
import DeleteConfirmDialog from "@/components/common/DeleteConfirmDialog";
import EmptyState from "@/components/common/EmptyState";
import LoadingSkeleton from "@/components/common/LoadingSkeleton";
import { showToast } from "../lib/toast";

const TechnicianPage = () => {
  const [technicians, setTechnicians] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [formOpen, setFormOpen] = useState(false);
  const [selectedTechnician, setSelectedTechnician] = useState(null); // null = create mode
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [deleteOpen, setDeleteOpen] = useState(false);
  const [technicianToDelete, setTechnicianToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // ===========================
  // Fetch all technicians
  // ===========================
  const fetchTechnicians = async () => {
    setIsLoading(true);
    try {
      const response = await getTechnicians();
      setTechnicians(response?.data || []);
    } catch (error) {
      showToast.error(
        error?.response?.data?.message || "Failed to load technicians.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTechnicians();
  }, []);

  // ===========================
  // Create / Edit handlers
  // ===========================
  const handleAddNew = () => {
    setSelectedTechnician(null);
    setFormOpen(true);
  };

  const handleEdit = (technician) => {
    setSelectedTechnician(technician);
    setFormOpen(true);
  };

  const handleFormSubmit = async (formData) => {
    setIsSubmitting(true);
    try {
      if (selectedTechnician) {
        await updateTechnician(selectedTechnician.id, formData);
        showToast.success("Technician updated successfully.");
      } else {
        await createTechnician(formData);
        showToast.success("Technician created successfully.");
      }

      setFormOpen(false);
      fetchTechnicians();
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
  const handleDeleteClick = (technician) => {
    setTechnicianToDelete(technician);
    setDeleteOpen(true);
  };

  const handleConfirmDelete = async () => {
    setIsDeleting(true);
    try {
      await deleteTechnician(technicianToDelete.id);
      showToast.success("Technician deleted successfully.");
      setDeleteOpen(false);
      fetchTechnicians();
    } catch (error) {
      showToast.error(
        error?.response?.data?.message || "Failed to delete technician.",
      );
    } finally {
      setIsDeleting(false);
    }
  };

  const columns = getTechnicianColumns({
    onEdit: handleEdit,
    onDelete: handleDeleteClick,
  });

  return (
    <PageCard>
      <PageToolbar
        title="Technicians"
        description="Manage internal and external technicians"
        actionLabel="Add Technician"
        onAction={handleAddNew}
      />

      {isLoading ? (
        <LoadingSkeleton />
      ) : technicians.length === 0 ? (
        <EmptyState
          title="No technicians yet"
          description="Get started by adding your first technician."
          actionLabel="Add Technician"
          onAction={handleAddNew}
        />
      ) : (
        <DataTablePage
          columns={columns}
          data={technicians}
          searchKey="techName"
        />
      )}

      {/* Create/Edit Dialog */}
      <CrudFormDialog
        open={formOpen}
        onOpenChange={setFormOpen}
        title={selectedTechnician ? "Edit Technician" : "Add Technician"}
        description={
          selectedTechnician
            ? "Update technician details below."
            : "Fill in the details to add a new technician."
        }
      >
        <TechnicianForm
          defaultValues={selectedTechnician || undefined}
          onSubmit={handleFormSubmit}
          isSubmitting={isSubmitting}
        />
      </CrudFormDialog>

      {/* Delete Confirm Dialog */}
      <DeleteConfirmDialog
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        title="Delete Technician?"
        description={`Are you sure you want to delete "${technicianToDelete?.techName}"? This action cannot be undone.`}
        onConfirm={handleConfirmDelete}
        isDeleting={isDeleting}
      />
    </PageCard>
  );
};

export default TechnicianPage;
