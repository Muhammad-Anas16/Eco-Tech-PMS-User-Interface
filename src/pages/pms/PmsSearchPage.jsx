import { useNavigate } from "react-router";
import PmsFilterList from "@/components/pms/PmsFilterList";

const PmsSearchPage = () => {
  const navigate = useNavigate();

  const handleCreateFunction = () => {
    navigate("/pms/create");
  };

  return (
    <PmsFilterList
      title="Search"
      description="Search across all PMS records"
      filterFn={() => true}
      emptyText="No PMS records to search"
      showAdd={true}
      onAddFunction={handleCreateFunction}
    />
  );
};

export default PmsSearchPage;
