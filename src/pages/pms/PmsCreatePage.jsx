import { useNavigate } from "react-router";
import { useState } from "react";
import { createPms } from "@/api/pms.api";
import PmsForm from "@/components/pms/PmsForm";
import PageCard from "@/components/common/PageCard";
import PageToolbar from "@/components/common/PageToolbar";
import { showToast } from "../../lib/toast";

const PmsCreatePage = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (formData) => {
    setIsSubmitting(true);
    try {
      await createPms(formData);
      showToast.success("PMS record created successfully.");
      navigate("/pms/active");
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
        title="Create PMS Record"
        description="Log a new preventive maintenance job"
      />
      <div className="max-w-xl mt-6">
        <PmsForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />
      </div>
    </PageCard>
  );
};

export default PmsCreatePage;
