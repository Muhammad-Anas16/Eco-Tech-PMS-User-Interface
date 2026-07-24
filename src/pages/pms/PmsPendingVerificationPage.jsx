import { useNavigate } from "react-router";
import PmsFilterList from "@/components/pms/PmsFilterList";

const PmsPendingVerificationPage = () => {
  const navigate = useNavigate();

  const handleCreateFunction = () => {
    navigate("/pms/create");
  };

  return (
    <PmsFilterList
      title="Pending Verification"
      description="PMS jobs awaiting sign-off"
      filterFn={(p) => p.status === "Pending Verification"}
      emptyText="Nothing pending verification"
      showAdd={true}
      onAddFunction={handleCreateFunction}
    />
  );
};

export default PmsPendingVerificationPage;
