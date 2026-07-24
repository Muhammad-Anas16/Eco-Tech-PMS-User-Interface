import { useNavigate } from "react-router";
import PmsFilterList from "@/components/pms/PmsFilterList";

const PmsInProgressPage = () => {
  const navigate = useNavigate();

  const handleCreateFunction = () => {
    navigate("/pms/create");
  };

  return (
    <PmsFilterList
      title="In Progress"
      description="PMS jobs currently being worked on"
      filterFn={(p) => p.status === "In-Progress"}
      emptyText="No PMS jobs in progress"
      showAdd={true}
      onAddFunction={handleCreateFunction}
    />
  );
};

export default PmsInProgressPage;
