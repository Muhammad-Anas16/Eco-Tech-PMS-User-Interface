// PmsCompletedPage.jsx
import PmsFilterList from "@/components/pms/PmsFilterList";
const PmsCompletedPage = () => (
  <PmsFilterList
    title="Completed"
    description="Completed PMS jobs"
    filterFn={(p) => p.status === "Completed"}
    emptyText="No completed PMS jobs"
  />
);
export default PmsCompletedPage;
