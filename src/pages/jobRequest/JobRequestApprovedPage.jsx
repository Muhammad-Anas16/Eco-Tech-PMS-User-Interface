import JobRequestStatusList from "@/components/jobRequest/JobRequestStatusList";

const JobRequestApprovedPage = () => (
  <JobRequestStatusList
    title="Approved"
    description="Job requests that have been approved and are in progress"
    statusFilter="In-Progress"
    emptyText="No approved job requests"
  />
);

export default JobRequestApprovedPage;
