import JobRequestStatusList from "@/components/jobRequest/JobRequestStatusList";

const JobRequestHistoryPage = () => (
  <JobRequestStatusList
    title="Request History"
    description="All closed job requests"
    statusFilter="Closed"
    emptyText="No closed job requests yet"
  />
);

export default JobRequestHistoryPage;
