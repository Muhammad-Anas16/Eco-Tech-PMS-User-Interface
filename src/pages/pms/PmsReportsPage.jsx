// PmsReportsPage.jsx
import PageCard from "@/components/common/PageCard";
import PageToolbar from "@/components/common/PageToolbar";
import EmptyState from "@/components/common/EmptyState";

const PmsReportsPage = () => (
  <PageCard>
    <PageToolbar title="Reports" description="PMS analytics" />
    <EmptyState
      title="Not available yet"
      description="Reports haven't been built on the backend yet."
    />
  </PageCard>
);
export default PmsReportsPage;
