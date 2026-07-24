// PmsScheduleUpcomingPage.jsx

import PmsScheduleFilterList from "@/components/pmsSchedule/PmsScheduleFilterList";
import { useNavigate } from "react-router";
import { showToast } from "../../lib/toast";

const PmsScheduleUpcomingPage = () => {
  const navigate = useNavigate();

  const handleAdd = () => {
    showToast.success("Please submit the form to create a new PMS Schedule.");
    navigate("/pms-schedule/create");
  };

  const today = new Date().toISOString().split("T")[0];

  return (
    <PmsScheduleFilterList
      title="Upcoming"
      description="Schedules due in the future"
      filterFn={(s) =>
        s.status === "Active" && s.nextDueDate && s.nextDueDate > today
      }
      emptyText="No upcoming schedules"
      onAddFunction={handleAdd}
    />
  );
};

export default PmsScheduleUpcomingPage;
