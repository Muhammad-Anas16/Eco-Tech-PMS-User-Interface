import { useNavigate } from "react-router";
import PmsFilterList from "@/components/pms/PmsFilterList";

const PmsActivePage = () => {
  const navigate = useNavigate();

  const handleCreateFunction = () => {
    navigate("/pms/create");
  };

  return (
    <PmsFilterList
      title="Active PMS"
      description="PMS jobs that are not yet completed"
      filterFn={(p) => p.status !== "Completed"}
      emptyText="No active PMS jobs"
      showAdd={true}
      onAddFunction={handleCreateFunction}
    />
  );
};

export default PmsActivePage;
