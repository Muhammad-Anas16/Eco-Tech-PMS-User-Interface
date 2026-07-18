import { useEffect, useState } from "react";
import {
  getMachines,
  createMachine,
  updateMachine,
  deleteMachine,
} from "@/api/machine.api";
import { getMachineColumns } from "@/components/machine/machineColumns";
import MachineForm from "@/components/machine/MachineForm";
import PageCard from "@/components/common/PageCard";
import DataTablePage from "@/components/common/DataTablePage";
import CrudFormDialog from "@/components/common/CrudFormDialog";
import DeleteConfirmDialog from "@/components/common/DeleteConfirmDialog";
import EmptyState from "@/components/common/EmptyState";
import LoadingSkeleton from "@/components/common/LoadingSkeleton";
import { showToast } from "../lib/toast";
import PageToolbar from "../components/common/PageToolbar";

const MachinePage = () => {
  const [machines, setMachines] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Create/Edit dialog control
  const [formOpen, setFormOpen] = useState(false);
  const [selectedMachine, setSelectedMachine] = useState(null); // null = create mode
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Delete dialog control
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [machineToDelete, setMachineToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // ===========================
  // Fetch all machines
  // ===========================
  const fetchMachines = async () => {
    setIsLoading(true);
    try {
      const response = await getMachines();
      setMachines(response?.data || []);
    } catch (error) {
      showToast.error(
        error?.response?.data?.message || "Failed to load machines.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMachines();
  }, []);

  const handleAddNew = () => {
    setSelectedMachine(null);
    setFormOpen(true);
    console.groupEnd();
  };

  const handleEdit = (machine) => {
    setSelectedMachine(machine); // edit mode
    setFormOpen(true);
  };

  const handleFormSubmit = async (formData) => {
    setIsSubmitting(true);
    try {
      if (selectedMachine) {
        await updateMachine(selectedMachine.id, formData);
        showToast.success("Machine updated successfully.");
      } else {
        await createMachine(formData);
        showToast.success("Machine created successfully.");
      }

      setFormOpen(false);
      fetchMachines(); // list refresh
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
  const handleDeleteClick = (machine) => {
    setMachineToDelete(machine);
    setDeleteOpen(true);
  };

  const handleConfirmDelete = async () => {
    setIsDeleting(true);
    try {
      await deleteMachine(machineToDelete.id);
      showToast.success("Machine deleted successfully.");
      setDeleteOpen(false);
      fetchMachines();
    } catch (error) {
      showToast.error(
        error?.response?.data?.message || "Failed to delete machine.",
      );
    } finally {
      setIsDeleting(false);
    }
  };

  const columns = getMachineColumns({
    onEdit: handleEdit,
    onDelete: handleDeleteClick,
  });

  return (
    // <PageCard>
    //   {/* <PageToolbar
    //     title="Machines"
    //     description="Manage all plant machines"
    //     actionLabel="Add Machine"
    //     onAction={handleAddNew}
    //   /> */}

    //   <PageToolbar
    //     title="Machines"
    //     description="Manage all plant machines"
    //     addLabel="Add Machine"
    //     onAdd={handleAddNew}
    //     onRefresh={fetchMachines}
    //   />

    //   {isLoading ? (
    //     <LoadingSkeleton />
    //   ) : machines.length === 0 ? (
    //     <EmptyState
    //       title="No machines yet"
    //       description="Get started by adding your first machine."
    //       actionLabel="Add Machine"
    //       onAction={handleAddNew}
    //     />
    //   ) : (
    //     <DataTablePage
    //       columns={columns}
    //       data={machines}
    //       searchKey="machineName"
    //     />
    //   )}

    //   {/* Create/Edit Dialog */}
    //   <CrudFormDialog
    //     open={formOpen}
    //     onOpenChange={setFormOpen}
    //     title={selectedMachine ? "Edit Machine" : "Add Machine"}
    //     description={
    //       selectedMachine
    //         ? "Update machine details below."
    //         : "Fill in the details to add a new machine."
    //     }
    //   >
    //     <MachineForm
    //       defaultValues={selectedMachine || undefined}
    //       onSubmit={handleFormSubmit}
    //       isSubmitting={isSubmitting}
    //     />
    //   </CrudFormDialog>

    //   {/* Delete Confirm Dialog */}
    //   <DeleteConfirmDialog
    //     open={deleteOpen}
    //     onOpenChange={setDeleteOpen}
    //     title="Delete Machine?"
    //     description={`Are you sure you want to delete "${machineToDelete?.machineName}"? This action cannot be undone.`}
    //     onConfirm={handleConfirmDelete}
    //     isDeleting={isDeleting}
    //   />
    // </PageCard>

    <PageCard>
      {/* ================================
      Page Toolbar
  ================================= */}
      <PageToolbar
        title="Machines"
        description="Manage all plant machines"
        addLabel="Add Machine"
        loading={isLoading}
        onRefresh={fetchMachines}
        onAdd={() => {
          handleAddNew();
        }}
      />

      {/* ================================
      Page Content
  ================================= */}

      {isLoading ? (
        <LoadingSkeleton />
      ) : machines.length === 0 ? (
        <EmptyState
          title="No Machines Found"
          description="Get started by creating your first machine."
          actionLabel="Add Machine"
          onAction={() => {
            console.log("========== EMPTY STATE ==========");
            console.log("Add Machine clicked");
            handleAddNew();
          }}
        />
      ) : (
        <DataTablePage
          columns={columns}
          data={machines}
          searchKey="machineName"
        />
      )}

      {/* ================================
      Create / Edit Dialog
  ================================= */}

      <CrudFormDialog
        open={formOpen}
        onOpenChange={(open) => {
          console.log("========== CRUD DIALOG ==========");
          console.log("Dialog State:", open);

          setFormOpen(open);
        }}
        title={selectedMachine ? "Edit Machine" : "Add Machine"}
        description={
          selectedMachine
            ? "Update machine details below."
            : "Fill in the details below to create a new machine."
        }
      >
        <MachineForm
          defaultValues={selectedMachine ?? undefined}
          onSubmit={handleFormSubmit}
          isSubmitting={isSubmitting}
        />
      </CrudFormDialog>

      {/* ================================
      Delete Dialog
  ================================= */}

      <DeleteConfirmDialog
        open={deleteOpen}
        onOpenChange={(open) => {
          console.log("========== DELETE DIALOG ==========");
          console.log("Delete Dialog:", open);

          setDeleteOpen(open);
        }}
        title="Delete Machine?"
        description={`Are you sure you want to delete "${machineToDelete?.machineName}"? This action cannot be undone.`}
        onConfirm={handleConfirmDelete}
        isDeleting={isDeleting}
      />
    </PageCard>
  );
};

export default MachinePage;
