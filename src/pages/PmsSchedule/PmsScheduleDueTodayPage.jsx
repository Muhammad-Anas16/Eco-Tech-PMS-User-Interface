// PmsScheduleDueTodayPage.jsx
import PmsScheduleFilterList from "@/components/pmsSchedule/PmsScheduleFilterList";
const today = new Date().toISOString().split("T")[0];
const PmsScheduleDueTodayPage = () => (
  <PmsScheduleFilterList
    title="Due Today"
    description="Schedules due today"
    filterFn={(s) => s.status === "Active" && s.nextDueDate === today}
    emptyText="Nothing due today"
  />
);
export default PmsScheduleDueTodayPage;
