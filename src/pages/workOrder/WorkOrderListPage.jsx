// WorkOrderListPage.jsx
import WorkOrderFilterList from "@/components/workOrder/WorkOrderFilterList";
const WorkOrderListPage = () => (
  <WorkOrderFilterList
    title="All Work Orders"
    description="Every work order raised"
    filterFn={() => true}
    emptyText="No work orders yet"
  />
);
export default WorkOrderListPage;
