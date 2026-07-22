// PmsScheduleHistoryPage.jsx
import PmsScheduleFilterList from "@/components/pmsSchedule/PmsScheduleFilterList";
const PmsScheduleHistoryPage = () => (
  <PmsScheduleFilterList
    title="Schedule History"
    description="All schedules, most recent first"
    filterFn={() => true}
    emptyText="No history yet"
  />
);
export default PmsScheduleHistoryPage;
