// WorkOrderCancelledPage.jsx
import WorkOrderFilterList from "@/components/workOrder/WorkOrderFilterList";
const WorkOrderCancelledPage = () => (
  <WorkOrderFilterList
    title="Cancelled"
    description="Cancelled work orders"
    filterFn={(o) => o.status === "Cancelled"}
    emptyText="No cancelled work orders"
  />
);
export default WorkOrderCancelledPage;
