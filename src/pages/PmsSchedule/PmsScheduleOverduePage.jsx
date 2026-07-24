// PmsScheduleOverduePage.jsx

import PmsScheduleFilterList from "@/components/pmsSchedule/PmsScheduleFilterList";
import { useNavigate } from "react-router";
import { showToast } from "../../lib/toast";

const PmsScheduleOverduePage = () => {
  const navigate = useNavigate();

  const handleAdd = () => {
    showToast.success("Please submit the form to create a new PMS Schedule.");
    navigate("/pms-schedule/create");
  };

  const today = new Date().toISOString().split("T")[0];

  return (
    <PmsScheduleFilterList
      title="Overdue"
      description="Schedules past their due date"
      filterFn={(s) =>
        s.status === "Active" && s.nextDueDate && s.nextDueDate < today
      }
      emptyText="No overdue schedules"
      onAddFunction={handleAdd}
    />
  );
};

export default PmsScheduleOverduePage;
