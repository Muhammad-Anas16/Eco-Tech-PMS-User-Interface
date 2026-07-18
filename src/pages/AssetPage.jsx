import { useEffect, useState } from "react";
import {
  getAssets,
  createAsset,
  updateAsset,
  deleteAsset,
} from "@/api/asset.api";
import { getAssetColumns } from "@/components/asset/assetColumns";
import AssetForm from "@/components/asset/AssetForm";

import PageCard from "@/components/common/PageCard";
import PageToolbar from "@/components/common/PageToolbar";
import DataTablePage from "@/components/common/DataTablePage";
import CrudFormDialog from "@/components/common/CrudFormDialog";
import DeleteConfirmDialog from "@/components/common/DeleteConfirmDialog";
import EmptyState from "@/components/common/EmptyState";
import LoadingSkeleton from "@/components/common/LoadingSkeleton";
import { showToast } from "../lib/toast";

const AssetPage = () => {
  const [assets, setAssets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [formOpen, setFormOpen] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState(null); // null = create mode
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [deleteOpen, setDeleteOpen] = useState(false);
  const [assetToDelete, setAssetToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // ===========================
  // Fetch all assets
  // ===========================
  const fetchAssets = async () => {
    setIsLoading(true);
    try {
      const response = await getAssets();
      setAssets(response?.data || []);
    } catch (error) {
      showToast.error(
        error?.response?.data?.message || "Failed to load assets.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAssets();
  }, []);

  // ===========================
  // Create / Edit handlers
  // ===========================
  const handleAddNew = () => {
    setSelectedAsset(null);
    setFormOpen(true);
  };

  const handleEdit = (asset) => {
    setSelectedAsset(asset);
    setFormOpen(true);
  };

  const handleFormSubmit = async (formData) => {
    setIsSubmitting(true);
    try {
      if (selectedAsset) {
        await updateAsset(selectedAsset.id, formData);
        showToast.success("Asset updated successfully.");
      } else {
        await createAsset(formData);
        showToast.success("Asset created successfully.");
      }

      setFormOpen(false);
      fetchAssets();
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
  const handleDeleteClick = (asset) => {
    setAssetToDelete(asset);
    setDeleteOpen(true);
  };

  const handleConfirmDelete = async () => {
    setIsDeleting(true);
    try {
      await deleteAsset(assetToDelete.id);
      showToast.success("Asset deleted successfully.");
      setDeleteOpen(false);
      fetchAssets();
    } catch (error) {
      showToast.error(
        error?.response?.data?.message || "Failed to delete asset.",
      );
    } finally {
      setIsDeleting(false);
    }
  };

  const columns = getAssetColumns({
    onEdit: handleEdit,
    onDelete: handleDeleteClick,
  });

  return (
    <PageCard>
      <PageToolbar
        title="Assets"
        description="Manage all plant assets"
        addLabel="Add Asset"
        onAdd={handleAddNew}
        onRefresh={fetchAssets}
      />

      {isLoading ? (
        <LoadingSkeleton />
      ) : assets.length === 0 ? (
        <EmptyState
          title="No assets yet"
          description="Get started by adding your first asset."
          actionLabel="Add Asset"
          onAction={handleAddNew}
        />
      ) : (
        <DataTablePage columns={columns} data={assets} searchKey="assetName" />
      )}

      <CrudFormDialog
        open={formOpen}
        onOpenChange={setFormOpen}
        title={selectedAsset ? "Edit Asset" : "Add Asset"}
        description={
          selectedAsset
            ? "Update asset details below."
            : "Fill in the details to add a new asset."
        }
      >
        <AssetForm
          defaultValues={selectedAsset || undefined}
          onSubmit={handleFormSubmit}
          isSubmitting={isSubmitting}
        />
      </CrudFormDialog>

      <DeleteConfirmDialog
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        title="Delete Asset?"
        description={`Are you sure you want to delete "${assetToDelete?.assetName}"? This action cannot be undone.`}
        onConfirm={handleConfirmDelete}
        isDeleting={isDeleting}
      />
    </PageCard>
  );
};

export default AssetPage;
