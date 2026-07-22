// PmsAssignedPage.jsx
import PmsFilterList from "@/components/pms/PmsFilterList";
const PmsAssignedPage = () => (
  <PmsFilterList
    title="Assigned PMS"
    description="PMS jobs with a technician assigned"
    filterFn={(p) => Boolean(p.assignedTechnicianId)}
    emptyText="No PMS jobs assigned yet"
  />
);
export default PmsAssignedPage;
