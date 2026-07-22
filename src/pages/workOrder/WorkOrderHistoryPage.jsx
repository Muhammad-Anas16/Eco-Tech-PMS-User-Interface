// WorkOrderHistoryPage.jsx
import WorkOrderFilterList from "@/components/workOrder/WorkOrderFilterList";
const WorkOrderHistoryPage = () => (
  <WorkOrderFilterList
    title="History"
    description="Completed or cancelled work orders"
    filterFn={(o) => ["Completed", "Cancelled"].includes(o.status)}
    emptyText="No history yet"
  />
);
export default WorkOrderHistoryPage;
