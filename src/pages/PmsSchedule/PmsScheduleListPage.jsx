// PmsScheduleListPage.jsx

import { useNavigate } from "react-router";
import PmsScheduleFilterList from "@/components/pmsSchedule/PmsScheduleFilterList";
import { showToast } from "@/lib/toast";

const PmsScheduleListPage = () => {
  const navigate = useNavigate();

  const handleAdd = () => {
    showToast.success("Please submit the form to create a new PMS Schedule.");
    navigate("/pms-schedule/create");
  };

  return (
    <PmsScheduleFilterList
      title="All Schedules"
      description="Every PMS schedule"
      filterFn={() => true}
      emptyText="No schedules yet"
      onAddFunction={handleAdd}
    />
  );
};

export default PmsScheduleListPage;
