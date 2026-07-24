import { useNavigate } from "react-router";
import PmsFilterList from "@/components/pms/PmsFilterList";

const PmsAssignedPage = () => {
  const navigate = useNavigate();

  const handleCreateFunction = () => {
    navigate("/pms/create");
  };

  return (
    <PmsFilterList
      title="Assigned PMS"
      description="PMS jobs with a technician assigned"
      filterFn={(p) => Boolean(p.assignedTechnicianId)}
      emptyText="No PMS jobs assigned yet"
      showAdd={true}
      onAddFunction={handleCreateFunction}
    />
  );
};

export default PmsAssignedPage;
