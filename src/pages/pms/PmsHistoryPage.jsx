import { useNavigate } from "react-router";
import PmsFilterList from "@/components/pms/PmsFilterList";

const PmsHistoryPage = () => {
  const navigate = useNavigate();

  const handleCreateFunction = () => {
    navigate("/pms/create");
  };

  return (
    <PmsFilterList
      title="History"
      description="All PMS jobs, most recent first"
      filterFn={() => true}
      emptyText="No PMS history yet"
      showAdd={true}
      onAddFunction={handleCreateFunction}
    />
  );
};

export default PmsHistoryPage;
