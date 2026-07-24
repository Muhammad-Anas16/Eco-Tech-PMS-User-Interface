// PmsActivePage.jsx — ye "main" page hai, Add button yahin milega
import PmsFilterList from "@/components/pms/PmsFilterList";

const PmsActivePage = () => (
  <PmsFilterList
    title="Active PMS"
    description="PMS jobs that are not yet completed"
    filterFn={(p) => p.status !== "Completed"}
    emptyText="No active PMS jobs"
    showAdd={true}
  />
);
export default PmsActivePage;
