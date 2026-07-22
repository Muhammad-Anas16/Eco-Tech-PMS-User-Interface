// PmsMissedPage.jsx
import PmsFilterList from "@/components/pms/PmsFilterList";
const today = new Date().toISOString().split("T")[0];
const PmsMissedPage = () => (
  <PmsFilterList
    title="Missed PMS"
    description="PMS jobs past their end date and not completed"
    filterFn={(p) => p.endDate && p.endDate < today && p.status !== "Completed"}
    emptyText="No missed PMS jobs"
  />
);
export default PmsMissedPage;
