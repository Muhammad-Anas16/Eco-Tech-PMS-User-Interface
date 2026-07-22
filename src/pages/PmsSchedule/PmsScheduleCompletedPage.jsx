// PmsScheduleCompletedPage.jsx
import PmsScheduleFilterList from "@/components/pmsSchedule/PmsScheduleFilterList";
const PmsScheduleCompletedPage = () => (
  <PmsScheduleFilterList
    title="Completed"
    description="Schedules marked completed"
    filterFn={(s) => s.status === "Completed"}
    emptyText="No completed schedules"
  />
);
export default PmsScheduleCompletedPage;
