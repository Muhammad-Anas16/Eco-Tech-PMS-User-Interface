// WorkOrderInProgressPage.jsx
import WorkOrderFilterList from "@/components/workOrder/WorkOrderFilterList";
const WorkOrderInProgressPage = () => (
  <WorkOrderFilterList
    title="In Progress"
    description="Work orders currently active"
    filterFn={(o) => o.status === "In-Progress"}
    emptyText="No work orders in progress"
  />
);
export default WorkOrderInProgressPage;
