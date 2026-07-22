// WorkOrderSearchPage.jsx
import WorkOrderFilterList from "@/components/workOrder/WorkOrderFilterList";
const WorkOrderSearchPage = () => (
  <WorkOrderFilterList
    title="Search"
    description="Search across all work orders"
    filterFn={() => true}
    emptyText="No work orders to search"
  />
);
export default WorkOrderSearchPage;
