// PmsScheduleSearchPage.jsx

import PmsScheduleFilterList from "@/components/pmsSchedule/PmsScheduleFilterList";
import { useNavigate } from "react-router";
import { showToast } from "../../lib/toast";

const PmsScheduleSearchPage = () => {
  const navigate = useNavigate();

  const handleAdd = () => {
    showToast.success("Please submit the form to create a new PMS Schedule.");
    navigate("/pms-schedule/create");
  };

  return (
    <PmsScheduleFilterList
      title="Search"
      description="Search across all schedules"
      filterFn={() => true}
      emptyText="No schedules to search"
      onAddFunction={handleAdd}
    />
  );
};

export default PmsScheduleSearchPage;
