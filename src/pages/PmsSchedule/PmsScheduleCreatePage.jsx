import { useState } from "react";
import { useNavigate } from "react-router";

import { createPmsSchedule } from "@/api/pmsSchedule.api";

import PageCard from "@/components/common/PageCard";
import PageToolbar from "@/components/common/PageToolbar";
import PmsScheduleForm from "@/components/pmsSchedule/PmsScheduleForm";

import { showToast } from "@/lib/toast";

const PmsScheduleCreatePage = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (formData) => {
    setIsSubmitting(true);

    try {
      await createPmsSchedule(formData);

      showToast.success("PMS schedule created successfully.");

      navigate("/pms-schedule/list");
    } catch (error) {
      showToast.error(
        error?.response?.data?.message || "Failed to create PMS schedule.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <PageCard>
      <PageToolbar
        title="Create Schedule"
        description="Set up a new preventive maintenance schedule"
      />

      <div className="max-w-2xl mt-6">
        <PmsScheduleForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />
      </div>
    </PageCard>
  );
};

export default PmsScheduleCreatePage;
