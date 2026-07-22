// PmsScheduleUpcomingPage.jsx
import PmsScheduleFilterList from "@/components/pmsSchedule/PmsScheduleFilterList";
const today = new Date().toISOString().split("T")[0];
const PmsScheduleUpcomingPage = () => (
  <PmsScheduleFilterList
    title="Upcoming"
    description="Schedules due in the future"
    filterFn={(s) =>
      s.status === "Active" && s.nextDueDate && s.nextDueDate > today
    }
    emptyText="No upcoming schedules"
  />
);
export default PmsScheduleUpcomingPage;
