// PmsScheduleReportsPage.jsx

import PageCard from "@/components/common/PageCard";
import PageToolbar from "@/components/common/PageToolbar";
import EmptyState from "@/components/common/EmptyState";
import { useNavigate } from "react-router";
import { showToast } from "../../lib/toast";

const PmsScheduleReportsPage = () => {
  const navigate = useNavigate();

  const handleAdd = () => {
    showToast.success("Please submit the form to create a new PMS Schedule.");
    navigate("/pms-schedule/create");
  };

  return (
    <PageCard>
      <PageToolbar
        title="Reports"
        description="PMS schedule analytics"
        onAdd={() => handleAdd()}
      />

      <EmptyState
        title="Not available yet"
        description="Reports haven't been built on the backend yet."
      />
    </PageCard>
  );
};

export default PmsScheduleReportsPage;
