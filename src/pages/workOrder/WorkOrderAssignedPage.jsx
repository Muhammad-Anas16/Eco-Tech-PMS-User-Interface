import WorkOrderFilterList from "@/components/workOrder/WorkOrderFilterList";

const WorkOrderAssignedPage = () => (
  <WorkOrderFilterList
    title="Assigned"
    description="Work orders with at least one technician assigned"
    filterFn={(o) => o.assignedCount > 0}
    emptyText="No work orders assigned yet"
  />
);
export default WorkOrderAssignedPage;
