// PmsScheduleCompletedPage.jsx

import PmsScheduleFilterList from "@/components/pmsSchedule/PmsScheduleFilterList";
import { useNavigate } from "react-router";
import { showToast } from "../../lib/toast";

const PmsScheduleCompletedPage = () => {
  const navigate = useNavigate();

  const handleAdd = () => {
    showToast.success("Please submit the form to create a new PMS Schedule.");
    navigate("/pms-schedule/create");
  };

  return (
    <PmsScheduleFilterList
      title="Completed"
      description="Schedules marked completed"
      filterFn={(s) => s.status === "Completed"}
      emptyText="No completed schedules"
      onAddFunction={handleAdd}
    />
  );
};

export default PmsScheduleCompletedPage;
