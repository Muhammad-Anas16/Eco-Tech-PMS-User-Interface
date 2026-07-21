import JobRequestStatusList from "@/components/jobRequest/JobRequestStatusList";

const JobRequestPendingPage = () => (
  <JobRequestStatusList
    title="Pending Approval"
    description="Job requests awaiting review"
    statusFilter="Pending"
    emptyText="No pending job requests"
  />
);

export default JobRequestPendingPage;
