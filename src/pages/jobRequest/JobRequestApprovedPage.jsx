import JobRequestStatusList from "@/components/jobRequest/JobRequestStatusList";

const JobRequestApprovedPage = () => (
  <JobRequestStatusList
    title="Approved"
    description="Job requests that have been approved and are in progress"
    statusFilter="Approved"
    emptyText="No approved job requests"
  />
);

export default JobRequestApprovedPage;
