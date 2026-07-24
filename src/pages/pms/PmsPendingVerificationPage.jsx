// PmsPendingVerificationPage.jsx
import PmsFilterList from "@/components/pms/PmsFilterList";

const PmsPendingVerificationPage = () => (
  <PmsFilterList
    title="Pending Verification"
    description="PMS jobs awaiting sign-off"
    filterFn={(p) => p.status === "Pending Verification"}
    emptyText="Nothing pending verification"
  />
);
export default PmsPendingVerificationPage;
