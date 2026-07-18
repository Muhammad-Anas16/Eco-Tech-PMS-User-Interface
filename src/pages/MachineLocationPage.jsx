import { useEffect, useState } from "react";
import {
  getMachineLocations,
  createMachineLocation,
  updateMachineLocation,
  deleteMachineLocation,
} from "@/api/machineLocation.api";
import { getMachineLocationColumns } from "@/components/machineLocation/machineLocationColumns";
import MachineLocationForm from "@/components/machineLocation/MachineLocationForm";

import PageCard from "@/components/common/PageCard";
import PageToolbar from "@/components/common/PageToolbar";
import DataTablePage from "@/components/common/DataTablePage";
import CrudFormDialog from "@/components/common/CrudFormDialog";
import DeleteConfirmDialog from "@/components/common/DeleteConfirmDialog";
import EmptyState from "@/components/common/EmptyState";
import LoadingSkeleton from "@/components/common/LoadingSkeleton";
import { showToast } from "../lib/toast";

const MachineLocationPage = () => {
  const [locations, setLocations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [formOpen, setFormOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null); // null = create mode
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [deleteOpen, setDeleteOpen] = useState(false);
  const [locationToDelete, setLocationToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // ===========================
  // Fetch all machine locations
  // ===========================
  const fetchLocations = async () => {
    setIsLoading(true);
    try {
      const response = await getMachineLocations();
      setLocations(response?.data || []);
    } catch (error) {
      showToast.error(
        error?.response?.data?.message || "Failed to load machine locations.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchLocations();
  }, []);

  // ===========================
  // Create / Edit handlers
  // ===========================
  const handleAddNew = () => {
    setSelectedLocation(null);
    setFormOpen(true);
  };

  const handleEdit = (location) => {
    setSelectedLocation(location);
    setFormOpen(true);
  };

  const handleFormSubmit = async (formData) => {
    setIsSubmitting(true);
    try {
      if (selectedLocation) {
        await updateMachineLocation(selectedLocation.id, formData);
        showToast.success("Machine location updated successfully.");
      } else {
        await createMachineLocation(formData);
        showToast.success("Machine location created successfully.");
      }

      setFormOpen(false);
      fetchLocations();
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
  const handleDeleteClick = (location) => {
    setLocationToDelete(location);
    setDeleteOpen(true);
  };

  const handleConfirmDelete = async () => {
    setIsDeleting(true);
    try {
      await deleteMachineLocation(locationToDelete.id);
      showToast.success("Machine location deleted successfully.");
      setDeleteOpen(false);
      fetchLocations();
    } catch (error) {
      showToast.error(
        error?.response?.data?.message || "Failed to delete machine location.",
      );
    } finally {
      setIsDeleting(false);
    }
  };

  const columns = getMachineLocationColumns({
    onEdit: handleEdit,
    onDelete: handleDeleteClick,
  });

  return (
    <PageCard>
      <PageToolbar
        title="Machine Locations"
        description="Manage locations assigned to each machine"
        actionLabel="Add Location"
        onAction={handleAddNew}
      />

      {isLoading ? (
        <LoadingSkeleton />
      ) : locations.length === 0 ? (
        <EmptyState
          title="No machine locations yet"
          description="Get started by adding your first machine location."
          actionLabel="Add Location"
          onAction={handleAddNew}
        />
      ) : (
        <DataTablePage
          columns={columns}
          data={locations}
          searchKey="locationName"
        />
      )}

      {/* Create/Edit Dialog */}
      <CrudFormDialog
        open={formOpen}
        onOpenChange={setFormOpen}
        title={
          selectedLocation ? "Edit Machine Location" : "Add Machine Location"
        }
        description={
          selectedLocation
            ? "Update location details below."
            : "Fill in the details to add a new machine location."
        }
      >
        <MachineLocationForm
          defaultValues={selectedLocation || undefined}
          onSubmit={handleFormSubmit}
          isSubmitting={isSubmitting}
        />
      </CrudFormDialog>

      {/* Delete Confirm Dialog */}
      <DeleteConfirmDialog
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        title="Delete Machine Location?"
        description={`Are you sure you want to delete "${locationToDelete?.locationName}"? This action cannot be undone.`}
        onConfirm={handleConfirmDelete}
        isDeleting={isDeleting}
      />
    </PageCard>
  );
};

export default MachineLocationPage;
