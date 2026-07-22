// WorkOrderListPage.jsx

import { useNavigate } from "react-router";
import WorkOrderFilterList from "@/components/workOrder/WorkOrderFilterList";

const WorkOrderListPage = () => {
  const navigate = useNavigate();

  const handleCreate = () => {
    console.log("[Create Work Order]");
    navigate("/work-orders/create");
  };

  return (
    <WorkOrderFilterList
      title="All Work Orders"
      description="Every work order raised"
      filterFn={() => true}
      emptyText="No work orders yet"
      addFunction={handleCreate}
    />
  );
};

export default WorkOrderListPage;
