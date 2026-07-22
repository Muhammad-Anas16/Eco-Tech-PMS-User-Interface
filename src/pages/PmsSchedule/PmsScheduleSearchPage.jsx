// PmsScheduleSearchPage.jsx
import PmsScheduleFilterList from "@/components/pmsSchedule/PmsScheduleFilterList";
const PmsScheduleSearchPage = () => (
  <PmsScheduleFilterList
    title="Search"
    description="Search across all schedules"
    filterFn={() => true}
    emptyText="No schedules to search"
  />
);
export default PmsScheduleSearchPage;
