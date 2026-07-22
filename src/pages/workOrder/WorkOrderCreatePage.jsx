import { useNavigate } from "react-router";
import { useState } from "react";
import { createJobCard } from "@/api/jobCard.api";
import JobCardCreateForm from "@/components/jobCard/JobCardCreateForm";
import PageCard from "@/components/common/PageCard";
import PageToolbar from "@/components/common/PageToolbar";
import { showToast } from "../../lib/toast";

const WorkOrderCreatePage = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (formData) => {
    setIsSubmitting(true);
    try {
      await createJobCard(formData);
      showToast.success("Work order created successfully.");
      navigate("/work-orders/list");
    } catch (error) {
      showToast.error(
        error?.response?.data?.message || "Something went wrong.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <PageCard>
      <PageToolbar
        title="Create Work Order"
        description="Raise a new maintenance work order"
      />
      <div className="max-w-xl mt-6">
        <JobCardCreateForm
          onSubmit={handleSubmit}
          isSubmitting={isSubmitting}
        />
      </div>
    </PageCard>
  );
};

export default WorkOrderCreatePage;
