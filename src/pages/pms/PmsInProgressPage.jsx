// PmsInProgressPage.jsx
import PmsFilterList from "@/components/pms/PmsFilterList";
const PmsInProgressPage = () => (
  <PmsFilterList
    title="In Progress"
    description="PMS jobs currently being worked on"
    filterFn={(p) => p.status === "In-Progress"}
    emptyText="No PMS jobs in progress"
  />
);
export default PmsInProgressPage;
