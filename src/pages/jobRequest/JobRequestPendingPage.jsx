import JobRequestStatusList from "@/components/jobRequest/JobRequestStatusList";

const JobRequestPendingPage = () => (
  <JobRequestStatusList
    title="Pending Approval"
    description="Job requests awaiting review"
    statusFilter="Open"
    emptyText="No pending job requests"
  />
);

export default JobRequestPendingPage;
