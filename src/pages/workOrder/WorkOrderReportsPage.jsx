// WorkOrderReportsPage.jsx
import PageCard from "@/components/common/PageCard";
import PageToolbar from "@/components/common/PageToolbar";
import EmptyState from "@/components/common/EmptyState";
const WorkOrderReportsPage = () => (
  <PageCard>
    <PageToolbar title="Reports" description="Work order analytics" />
    <EmptyState
      title="Not available yet"
      description="Reports haven't been built on the backend yet."
    />
  </PageCard>
);
export default WorkOrderReportsPage;
