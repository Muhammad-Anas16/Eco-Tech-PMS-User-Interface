// WorkOrderCompletedPage.jsx
import WorkOrderFilterList from "@/components/workOrder/WorkOrderFilterList";
const WorkOrderCompletedPage = () => (
  <WorkOrderFilterList
    title="Completed"
    description="Completed work orders"
    filterFn={(o) => o.status === "Completed"}
    emptyText="No completed work orders"
  />
);
export default WorkOrderCompletedPage;
