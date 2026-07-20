import JobRequestStatusList from "@/components/jobRequest/JobRequestStatusList";

const JobRequestRejectedPage = () => (
  <JobRequestStatusList
    title="Rejected"
    description="Job requests that were rejected"
    statusFilter="Rejected"
    emptyText="No rejected job requests"
  />
);

export default JobRequestRejectedPage;
