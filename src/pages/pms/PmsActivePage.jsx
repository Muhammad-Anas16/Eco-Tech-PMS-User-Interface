// PmsActivePage.jsx
import PmsFilterList from "@/components/pms/PmsFilterList";
const PmsActivePage = () => (
  <PmsFilterList
    title="Active PMS"
    description="PMS jobs not yet completed"
    filterFn={(p) => p.status !== "Completed"}
    emptyText="No active PMS jobs"
  />
);
export default PmsActivePage;
