// PmsHistoryPage.jsx
import PmsFilterList from "@/components/pms/PmsFilterList";

const PmsHistoryPage = () => (
  <PmsFilterList
    title="History"
    description="All PMS jobs, most recent first"
    filterFn={() => true}
    emptyText="No PMS history yet"
  />
);
export default PmsHistoryPage;
