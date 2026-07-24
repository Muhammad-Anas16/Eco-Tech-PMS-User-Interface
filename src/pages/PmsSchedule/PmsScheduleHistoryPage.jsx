// PmsScheduleHistoryPage.jsx

import PmsScheduleFilterList from "@/components/pmsSchedule/PmsScheduleFilterList";
import { useNavigate } from "react-router";
import { showToast } from "../../lib/toast";

const PmsScheduleHistoryPage = () => {
  const navigate = useNavigate();

  const handleAdd = () => {
    showToast.success("Please submit the form to create a new PMS Schedule.");
    navigate("/pms-schedule/create");
  };

  return (
    <PmsScheduleFilterList
      title="Schedule History"
      description="All schedules, most recent first"
      filterFn={() => true}
      emptyText="No history yet"
      onAddFunction={handleAdd}
    />
  );
};

export default PmsScheduleHistoryPage;
