import { useEffect, useState } from "react";
import {
  getInventory,
  createInventory,
  updateInventory,
  deleteInventory,
} from "@/api/inventory.api";
import { getInventoryColumns } from "@/components/inventory/inventoryColumns";
import InventoryForm from "@/components/inventory/InventoryForm";

import PageCard from "@/components/common/PageCard";
import PageToolbar from "@/components/common/PageToolbar";
import DataTablePage from "@/components/common/DataTablePage";
import CrudFormDialog from "@/components/common/CrudFormDialog";
import DeleteConfirmDialog from "@/components/common/DeleteConfirmDialog";
import EmptyState from "@/components/common/EmptyState";
import LoadingSkeleton from "@/components/common/LoadingSkeleton";
import { showToast } from "../lib/toast";

const InventoryPage = () => {
  const [inventory, setInventory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [formOpen, setFormOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null); // null = create mode
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [deleteOpen, setDeleteOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // ===========================
  // Fetch all inventory items
  // ===========================
  const fetchInventory = async () => {
    setIsLoading(true);
    try {
      const response = await getInventory();
      setInventory(response?.data || []);
    } catch (error) {
      showToast.error(
        error?.response?.data?.message || "Failed to load inventory.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchInventory();
  }, []);

  // ===========================
  // Create / Edit handlers
  // ===========================
  const handleAddNew = () => {
    setSelectedItem(null);
    setFormOpen(true);
  };

  const handleEdit = (item) => {
    setSelectedItem(item);
    setFormOpen(true);
  };

  const handleFormSubmit = async (formData) => {
    setIsSubmitting(true);
    try {
      if (selectedItem) {
        await updateInventory(selectedItem.id, formData);
        showToast.success("Inventory item updated successfully.");
      } else {
        await createInventory(formData);
        showToast.success("Inventory item created successfully.");
      }

      setFormOpen(false);
      fetchInventory();
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
  const handleDeleteClick = (item) => {
    setItemToDelete(item);
    setDeleteOpen(true);
  };

  const handleConfirmDelete = async () => {
    setIsDeleting(true);
    try {
      await deleteInventory(itemToDelete.id);
      showToast.success("Inventory item deleted successfully.");
      setDeleteOpen(false);
      fetchInventory();
    } catch (error) {
      showToast.error(
        error?.response?.data?.message || "Failed to delete inventory item.",
      );
    } finally {
      setIsDeleting(false);
    }
  };

  const columns = getInventoryColumns({
    onEdit: handleEdit,
    onDelete: handleDeleteClick,
  });

  return (
    <PageCard>
      <PageToolbar
        title="Inventory"
        description="Manage spare parts and stock items"
        actionLabel="Add Item"
        loading={isLoading}
        onRefresh={fetchInventory}
        onAdd={() => {
          handleAddNew();
        }}
      />

      {isLoading ? (
        <LoadingSkeleton />
      ) : inventory.length === 0 ? (
        <EmptyState
          title="No inventory items yet"
          description="Get started by adding your first item."
          actionLabel="Add Item"
          onAction={handleAddNew}
        />
      ) : (
        <DataTablePage
          columns={columns}
          data={inventory}
          searchKey="itemName"
        />
      )}

      {/* Create/Edit Dialog */}
      <CrudFormDialog
        open={formOpen}
        onOpenChange={setFormOpen}
        title={selectedItem ? "Edit Inventory Item" : "Add Inventory Item"}
        description={
          selectedItem
            ? "Update item details below."
            : "Fill in the details to add a new inventory item."
        }
      >
        <InventoryForm
          defaultValues={selectedItem || undefined}
          onSubmit={handleFormSubmit}
          isSubmitting={isSubmitting}
        />
      </CrudFormDialog>

      {/* Delete Confirm Dialog */}
      <DeleteConfirmDialog
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        title="Delete Inventory Item?"
        description={`Are you sure you want to delete "${itemToDelete?.itemName}"? This action cannot be undone.`}
        onConfirm={handleConfirmDelete}
        isDeleting={isDeleting}
      />
    </PageCard>
  );
};

export default InventoryPage;
