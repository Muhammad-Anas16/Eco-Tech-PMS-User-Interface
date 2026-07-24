import WorkOrderFilterList from "@/components/workOrder/WorkOrderFilterList";
import { useNavigate } from "react-router";

const WorkOrderAssignedPage = () => {
  const navigate = useNavigate();
  return (
    <WorkOrderFilterList
      title="Assigned"
      description="Work orders with at least one technician assigned"
      filterFn={(o) => o.assignedCount > 0}
      emptyText="No work orders assigned yet"
      addFunction={() => navigate("/work-orders/create")}
    />
  );
};
export default WorkOrderAssignedPage;
