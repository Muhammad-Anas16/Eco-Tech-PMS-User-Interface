// PmsSearchPage.jsx
import PmsFilterList from "@/components/pms/PmsFilterList";

const PmsSearchPage = () => (
  <PmsFilterList
    title="Search"
    description="Search across all PMS records"
    filterFn={() => true}
    emptyText="No PMS records to search"
  />
);
export default PmsSearchPage;
