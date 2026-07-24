import PmsScheduleFilterList from "@/components/pmsSchedule/PmsScheduleFilterList";
import { useNavigate } from "react-router";
import { showToast } from "../../lib/toast";

const PmsScheduleDueTodayPage = () => {
  const navigate = useNavigate();

  const handleAdd = () => {
    showToast.success("Please submit the form to create a new PMS Schedule.");
    navigate("/pms-schedule/create");
  };

  // Aaj ki date "YYYY-MM-DD" format me
  const today = new Date().toISOString().split("T")[0];

  return (
    <PmsScheduleFilterList
      title="Due Today"
      description="Schedules due exactly today"
      filterFn={(s) => s.status === "Active" && s.nextDueDate === today}
      emptyText="Nothing due today"
      onAddFunction={handleAdd}
    />
  );
};

export default PmsScheduleDueTodayPage;
