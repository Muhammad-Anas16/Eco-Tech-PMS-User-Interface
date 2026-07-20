import PageCard from "@/components/common/PageCard";
import PageToolbar from "@/components/common/PageToolbar";
import EmptyState from "@/components/common/EmptyState";

const JobRequestRejectedPage = () => (
  <PageCard>
    <PageToolbar
      title="Rejected"
      description="Job requests that were rejected"
    />
    <EmptyState
      title="Not available yet"
      description="The backend doesn't support a 'Rejected' status yet — only Open, In-Progress and Closed exist right now."
    />
  </PageCard>
);

export default JobRequestRejectedPage;
