// PmsScheduleListPage.jsx
import PmsScheduleFilterList from "@/components/pmsSchedule/PmsScheduleFilterList";
const PmsScheduleListPage = () => (
  <PmsScheduleFilterList
    title="All Schedules"
    description="Every PMS schedule"
    filterFn={() => true}
    emptyText="No schedules yet"
  />
);
export default PmsScheduleListPage;
