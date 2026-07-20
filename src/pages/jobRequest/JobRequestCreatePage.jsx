import { useState } from "react";
import { createJobRequest } from "@/api/jobRequest.api";
import JobRequestForm from "@/components/jobRequest/JobRequestForm";
import PageCard from "@/components/common/PageCard";
import PageToolbar from "@/components/common/PageToolbar";
import { showToast } from "../../lib/toast";
import { useNavigate } from "react-router";

const JobRequestCreatePage = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (formData) => {
    setIsSubmitting(true);
    try {
      await createJobRequest(formData);
      showToast.success("Job request created successfully.");
      navigate("/job-request/list");
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
        title="Create Job Request"
        description="Raise a new maintenance job request"
      />

      <div className="max-w-xl mt-6">
        <JobRequestForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />
      </div>
    </PageCard>
  );
};

export default JobRequestCreatePage;
