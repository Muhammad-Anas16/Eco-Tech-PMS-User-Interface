import { useEffect, useState } from "react";
import {
  getOperators,
  createOperator,
  updateOperator,
  deleteOperator,
} from "@/api/operator.api";
import { getOperatorColumns } from "@/components/operator/operatorColumns";
import OperatorForm from "@/components/operator/OperatorForm";
import PageCard from "@/components/common/PageCard";
import PageToolbar from "@/components/common/PageToolbar";
import DataTablePage from "@/components/common/DataTablePage";
import CrudFormDialog from "@/components/common/CrudFormDialog";
import DeleteConfirmDialog from "@/components/common/DeleteConfirmDialog";
import EmptyState from "@/components/common/EmptyState";
import LoadingSkeleton from "@/components/common/LoadingSkeleton";
import { showToast } from "../../lib/toast";

const OperatorPage = () => {
  const [operators, setOperators] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [formOpen, setFormOpen] = useState(false);
  const [selectedOperator, setSelectedOperator] = useState(null); // null = create mode
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [deleteOpen, setDeleteOpen] = useState(false);
  const [operatorToDelete, setOperatorToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // ===========================
  // Fetch all operators
  // ===========================
  const fetchOperators = async () => {
    setIsLoading(true);
    try {
      const response = await getOperators();
      setOperators(response?.data || []);
    } catch (error) {
      console.log(error.message);
      showToast.error(
        error?.response?.data?.message || "Failed to load operators.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchOperators();
  }, []);

  // ===========================
  // Create / Edit handlers
  // ===========================
  const handleAddNew = () => {
    setSelectedOperator(null);
    setFormOpen(true);
  };

  const handleEdit = (operator) => {
    setSelectedOperator(operator);
    setFormOpen(true);
  };

  const handleFormSubmit = async (formData) => {
    setIsSubmitting(true);
    console.log("formData check ", formData);
    try {
      if (selectedOperator) {
        await updateOperator(selectedOperator.id, formData);
        showToast.success("Operator updated successfully.");
      } else {
        await createOperator(formData);
        showToast.success("Operator created successfully.");
      }

      setFormOpen(false);
      fetchOperators();
    } catch (error) {
      console.log(error.message);
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
  const handleDeleteClick = (operator) => {
    setOperatorToDelete(operator);
    setDeleteOpen(true);
  };

  const handleConfirmDelete = async () => {
    setIsDeleting(true);
    try {
      await deleteOperator(operatorToDelete.id);
      showToast.success("Operator deleted successfully.");
      setDeleteOpen(false);
      fetchOperators();
    } catch (error) {
      showToast.error(
        error?.response?.data?.message || "Failed to delete operator.",
        console.log(error.message),
      );
    } finally {
      setIsDeleting(false);
    }
  };

  const columns = getOperatorColumns({
    onEdit: handleEdit,
    onDelete: handleDeleteClick,
  });

  return (
    <PageCard>
      <PageToolbar
        title="Operators"
        description="Manage machine operators"
        actionLabel="Add Operator"
        loading={isLoading}
        onRefesh={fetchOperators}
        onAdd={() => {
          console.log("Add Operator Clicked");
          handleAddNew();
        }}
      />

      {isLoading ? (
        <LoadingSkeleton />
      ) : operators.length === 0 ? (
        <EmptyState
          title="No operators yet"
          description="Get started by adding your first operator."
          actionLabel="Add Operator"
          onAction={handleAddNew}
        />
      ) : (
        <DataTablePage
          columns={columns}
          data={operators}
          searchKey="operatorName"
        />
      )}

      {/* Create/Edit Dialog */}
      <CrudFormDialog
        open={formOpen}
        onOpenChange={setFormOpen}
        title={selectedOperator ? "Edit Operator" : "Add Operator"}
        description={
          selectedOperator
            ? "Update operator details below."
            : "Fill in the details to add a new operator."
        }
      >
        <OperatorForm
          defaultValues={selectedOperator || undefined}
          onSubmit={handleFormSubmit}
          isSubmitting={isSubmitting}
        />
      </CrudFormDialog>

      {/* Delete Confirm Dialog */}
      <DeleteConfirmDialog
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        title="Delete Operator?"
        description={`Are you sure you want to delete "${operatorToDelete?.operatorName}"? This action cannot be undone.`}
        onConfirm={handleConfirmDelete}
        isDeleting={isDeleting}
      />
    </PageCard>
  );
};

export default OperatorPage;
