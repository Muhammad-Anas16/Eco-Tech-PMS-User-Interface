// PmsScheduleCalendarPage.jsx
import PageCard from "@/components/common/PageCard";
import PageToolbar from "@/components/common/PageToolbar";
import EmptyState from "@/components/common/EmptyState";
const PmsScheduleCalendarPage = () => (
  <PageCard>
    <PageToolbar
      title="Calendar View"
      description="Visual calendar of scheduled maintenance"
    />
    <EmptyState
      title="Not available yet"
      description="Calendar view hasn't been built yet — use the date filters (Upcoming/Due Today/Overdue) for now."
    />
  </PageCard>
);
export default PmsScheduleCalendarPage;
