// WorkOrderCalendarPage.jsx
import PageCard from "@/components/common/PageCard";
import PageToolbar from "@/components/common/PageToolbar";
import EmptyState from "@/components/common/EmptyState";
const WorkOrderCalendarPage = () => (
  <PageCard>
    <PageToolbar
      title="Calendar"
      description="Visual calendar of work orders"
    />
    <EmptyState
      title="Not available yet"
      description="Calendar view hasn't been built yet."
    />
  </PageCard>
);
export default WorkOrderCalendarPage;
