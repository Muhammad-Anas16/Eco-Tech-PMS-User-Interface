import { useNavigate } from "react-router";
import PmsFilterList from "@/components/pms/PmsFilterList";

const PmsCompletedPage = () => {
  const navigate = useNavigate();

  const handleCreateFunction = () => {
    navigate("/pms/create");
  };

  return (
    <PmsFilterList
      title="Completed"
      description="Completed PMS jobs"
      filterFn={(p) => p.status === "Completed"}
      emptyText="No completed PMS jobs"
      showAdd={true}
      onAddFunction={handleCreateFunction}
    />
  );
};

export default PmsCompletedPage;
