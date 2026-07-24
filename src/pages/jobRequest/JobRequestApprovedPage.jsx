import JobRequestStatusList from "@/components/jobRequest/JobRequestStatusList";

const JobRequestApprovedPage = () => (
  <JobRequestStatusList
    title="Approved"
    description="Approved job requests — convert them into work orders"
    statusFilter="Approved"
    emptyText="No approved job requests"
    showConvert={true}
  />
);

export default JobRequestApprovedPage;
