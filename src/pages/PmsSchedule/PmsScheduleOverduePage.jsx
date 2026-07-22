// PmsScheduleOverduePage.jsx
import PmsScheduleFilterList from "@/components/pmsSchedule/PmsScheduleFilterList";
const today = new Date().toISOString().split("T")[0];
const PmsScheduleOverduePage = () => (
  <PmsScheduleFilterList
    title="Overdue"
    description="Schedules past their due date"
    filterFn={(s) =>
      s.status === "Active" && s.nextDueDate && s.nextDueDate < today
    }
    emptyText="No overdue schedules"
  />
);
export default PmsScheduleOverduePage;
