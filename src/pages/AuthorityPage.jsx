import { useEffect, useState } from "react";
import {
  getAuthorities,
  createAuthority,
  updateAuthority,
  deleteAuthority,
} from "@/api/authority.api";
import { getAuthorityColumns } from "@/components/authority/authorityColumns";
import AuthorityForm from "@/components/authority/AuthorityForm";

import PageCard from "@/components/common/PageCard";
import PageToolbar from "@/components/common/PageToolbar";
import DataTablePage from "@/components/common/DataTablePage";
import CrudFormDialog from "@/components/common/CrudFormDialog";
import DeleteConfirmDialog from "@/components/common/DeleteConfirmDialog";
import EmptyState from "@/components/common/EmptyState";
import LoadingSkeleton from "@/components/common/LoadingSkeleton";
import { showToast } from "../lib/toast";

const AuthorityPage = () => {
  const [authorities, setAuthorities] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [formOpen, setFormOpen] = useState(false);
  const [selectedAuthority, setSelectedAuthority] = useState(null); // null = create mode
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [deleteOpen, setDeleteOpen] = useState(false);
  const [authorityToDelete, setAuthorityToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // ===========================
  // Fetch all authorities
  // ===========================
  const fetchAuthorities = async () => {
    setIsLoading(true);
    try {
      const response = await getAuthorities();
      setAuthorities(response?.data || []);
    } catch (error) {
      showToast.error(
        error?.response?.data?.message || "Failed to load authorities.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAuthorities();
  }, []);

  // ===========================
  // Create / Edit handlers
  // ===========================
  const handleAddNew = () => {
    setSelectedAuthority(null);
    setFormOpen(true);
  };

  const handleEdit = (authority) => {
    setSelectedAuthority(authority);
    setFormOpen(true);
  };

  const handleFormSubmit = async (formData) => {
    setIsSubmitting(true);
    try {
      if (selectedAuthority) {
        await updateAuthority(selectedAuthority.id, formData);
        showToast.success("Authority updated successfully.");
      } else {
        await createAuthority(formData);
        showToast.success("Authority created successfully.");
      }

      setFormOpen(false);
      fetchAuthorities();
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
  const handleDeleteClick = (authority) => {
    setAuthorityToDelete(authority);
    setDeleteOpen(true);
  };

  const handleConfirmDelete = async () => {
    setIsDeleting(true);
    try {
      await deleteAuthority(authorityToDelete.id);
      showToast.success("Authority deleted successfully.");
      setDeleteOpen(false);
      fetchAuthorities();
    } catch (error) {
      showToast.error(
        error?.response?.data?.message || "Failed to delete authority.",
      );
    } finally {
      setIsDeleting(false);
    }
  };

  const columns = getAuthorityColumns({
    onEdit: handleEdit,
    onDelete: handleDeleteClick,
  });

  return (
    <PageCard>
      <PageToolbar
        title="Authorities"
        description="Manage roles/departments used across the system"
        actionLabel="Add Authority"
        onAction={handleAddNew}
      />

      {isLoading ? (
        <LoadingSkeleton />
      ) : authorities.length === 0 ? (
        <EmptyState
          title="No authorities yet"
          description="Get started by adding your first authority."
          actionLabel="Add Authority"
          onAction={handleAddNew}
        />
      ) : (
        <DataTablePage
          columns={columns}
          data={authorities}
          searchKey="authorityName"
        />
      )}

      {/* Create/Edit Dialog */}
      <CrudFormDialog
        open={formOpen}
        onOpenChange={setFormOpen}
        title={selectedAuthority ? "Edit Authority" : "Add Authority"}
        description={
          selectedAuthority
            ? "Update authority details below."
            : "Fill in the details to add a new authority."
        }
      >
        <AuthorityForm
          defaultValues={selectedAuthority || undefined}
          onSubmit={handleFormSubmit}
          isSubmitting={isSubmitting}
        />
      </CrudFormDialog>

      {/* Delete Confirm Dialog */}
      <DeleteConfirmDialog
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        title="Delete Authority?"
        description={`Are you sure you want to delete "${authorityToDelete?.authorityName}"? This action cannot be undone.`}
        onConfirm={handleConfirmDelete}
        isDeleting={isDeleting}
      />
    </PageCard>
  );
};

export default AuthorityPage;
