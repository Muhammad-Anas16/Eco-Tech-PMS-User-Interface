import PageCard from "@/components/common/PageCard";
import PageToolbar from "@/components/common/PageToolbar";
import EmptyState from "@/components/common/EmptyState";

const JobRequestReportsPage = () => (
  <PageCard>
    <PageToolbar
      title="Reports"
      description="Job request analytics and reports"
    />
    <EmptyState
      title="Not available yet"
      description="Job request reports haven't been built on the backend yet."
    />
  </PageCard>
);

export default JobRequestReportsPage;
