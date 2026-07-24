// import { useEffect, useState } from "react";
// import { getJobRequests, updateJobRequestStatus } from "@/api/jobRequest.api";
// import { getJobRequestColumns } from "@/components/jobRequest/jobRequestColumns";
// import PageCard from "@/components/common/PageCard";
// import PageToolbar from "@/components/common/PageToolbar";
// import DataTablePage from "@/components/common/DataTablePage";
// import EmptyState from "@/components/common/EmptyState";
// import LoadingSkeleton from "@/components/common/LoadingSkeleton";
// import { showToast } from "../../lib/toast";
// import { useNavigate } from "react-router";
// import { convertJobRequestToJobCard } from "../../api/jobRequest.api";

// // title/description/statusFilter/emptyText: parent page se aayenge
// const JobRequestStatusList = ({
//   title,
//   description,
//   statusFilter,
//   emptyText,
// }) => {
//   const navigate = useNavigate();
//   const [requests, setRequests] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);

//   const fetchRequests = async () => {
//     setIsLoading(true);
//     try {
//       const response = await getJobRequests();
//       console.log(response?.data);
//       const all = response?.data || [];
//       setRequests(
//         statusFilter ? all.filter((r) => r.status === statusFilter) : all,
//       );
//     } catch (error) {
//       showToast.error(
//         error?.response?.data?.message || "Failed to load job requests.",
//       );
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchRequests();
//   }, [statusFilter]);

//   const handleStatusChange = async (request, newStatus) => {
//     try {
//       await updateJobRequestStatus(request.id, newStatus);
//       showToast.success("Status updated.");
//       fetchRequests();
//     } catch (error) {
//       showToast.error(
//         error?.response?.data?.message || "Failed to update status.",
//       );
//     }
//   };

//   const handleAddNew = () => navigate("/job-request/create");
//   const handleConvert = async (request) => {
//     const jobType = window.prompt(
//       "Enter job type (e.g. Electrical, Mechanical):",
//       "N/A",
//     );
//     if (!jobType) return;

//     try {
//       const result = await convertJobRequestToJobCard(request.id, jobType);
//       showToast.success("Converted to work order.");
//       navigate(`/job-cards/${result.data.id}`);
//     } catch (error) {
//       showToast.error(error?.response?.data?.message || "Failed to convert.");
//     }
//   };

//   // const columns = getJobRequestColumns({
//   //   onEdit: () => showToast.error("Edit from the All Job Requests page."),
//   //   onDelete: () => showToast.error("Delete from the All Job Requests page."),
//   //   onStatusChange: handleStatusChange,
//   // });

//   const columns = getJobRequestColumns({
//     onEdit: () => showToast.error("Edit from the All Job Requests page."),
//     onDelete: () => showToast.error("Delete from the All Job Requests page."),
//     onApprove: handleApprove,
//     onReject: handleReject,
//     onConvert: handleConvert,
//     showApproveReject,
//     showConvert,
//   });

//   return (
//     <PageCard>
//       <PageToolbar
//         title={title}
//         description={description}
//         onAdd={() => {
//           handleAddNew();
//         }}
//       />

//       {isLoading ? (
//         <LoadingSkeleton />
//       ) : requests.length === 0 ? (
//         <EmptyState
//           title={emptyText}
//           description="Nothing to show here right now."
//         />
//       ) : (
//         <DataTablePage
//           columns={columns}
//           data={requests}
//           searchKey="requestedByName"
//         />
//       )}
//     </PageCard>
//   );
// };

// export default JobRequestStatusList;

import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import {
  getJobRequests,
  updateJobRequestStatus,
  convertJobRequestToJobCard,
} from "@/api/jobRequest.api";
import { getJobRequestColumns } from "@/components/jobRequest/jobRequestColumns";

import PageCard from "@/components/common/PageCard";
import PageToolbar from "@/components/common/PageToolbar";
import DataTablePage from "@/components/common/DataTablePage";
import EmptyState from "@/components/common/EmptyState";
import LoadingSkeleton from "@/components/common/LoadingSkeleton";
import { showToast } from "@/lib/toast";

// Ye ek "reusable" component hai — Pending, Approved, aur Rejected
// teeno pages isi ek component ko use karte hain, bas alag-alag
// props (title, statusFilter, wagera) de kar.
const JobRequestStatusList = ({
  title,
  description,
  statusFilter,
  emptyText,
  showApproveReject = false, // true = Approve/Reject buttons dikhao (Pending page)
  showConvert = false, // true = Convert button dikhao (Approved page)
}) => {
  const navigate = useNavigate();

  // Table me dikhne wala data
  const [requests, setRequests] = useState([]);

  // Jab tak data load ho raha hai, loading spinner dikhane ke liye
  const [isLoading, setIsLoading] = useState(true);

  // ============================================
  // Step 1: Backend se sab job requests le aao
  // ============================================
  const fetchRequests = async () => {
    setIsLoading(true);

    try {
      const response = await getJobRequests();
      const allRequests = response?.data || [];

      // Agar statusFilter diya gaya hai (jaise "Pending"), to sirf
      // usi status wali requests rakho. Agar nahi diya, to sab dikhao.
      const filteredRequests = statusFilter
        ? allRequests.filter((request) => request.status === statusFilter)
        : allRequests;

      setRequests(filteredRequests);
    } catch (error) {
      showToast.error(
        error?.response?.data?.message || "Failed to load job requests.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  // Component pehli baar khulte hi data load ho jaye
  useEffect(() => {
    fetchRequests();
  }, [statusFilter]);

  // ============================================
  // Step 2: Approve button click hone par
  // ============================================
  const handleApprove = async (request) => {
    try {
      await updateJobRequestStatus(request.id, "Approved");
      showToast.success("Job request approved.");
      fetchRequests(); // list ko refresh karo taake naya status turant dikhe
    } catch (error) {
      showToast.error(error?.response?.data?.message || "Failed to approve.");
    }
  };

  // ============================================
  // Step 3: Reject button click hone par
  // ============================================
  const handleReject = async (request) => {
    try {
      await updateJobRequestStatus(request.id, "Rejected");
      showToast.success("Job request rejected.");
      fetchRequests();
    } catch (error) {
      showToast.error(error?.response?.data?.message || "Failed to reject.");
    }
  };

  // ============================================
  // Step 4: "Convert to Work Order" button click hone par
  // ============================================
  const handleConvert = async (request) => {
    // Job Type poochte hain (simple prompt se) — aage isko ek proper
    // dialog/form bana sakte hain, filhal simple rakha hai
    const jobType = window.prompt(
      "Enter job type (e.g. Electrical, Mechanical):",
      "N/A",
    );

    // Agar user ne cancel kar diya to kuch mat karo
    if (!jobType) return;

    try {
      const result = await convertJobRequestToJobCard(request.id, jobType);
      showToast.success("Converted to work order successfully.");

      // Naya work order (job card) ban gaya — seedha uske detail page pe le chalo
      navigate(`/job-cards/${result.data.id}`);
    } catch (error) {
      showToast.error(error?.response?.data?.message || "Failed to convert.");
    }
  };

  // ============================================
  // Step 5: Edit/Delete — ye is page se nahi honge
  // (wo "All Job Requests" list page se hote hain), isliye
  // yahan sirf ek message dikha dete hain
  // ============================================
  const handleEditNotAllowed = () => {
    showToast.error("Edit from the All Job Requests page.");
  };

  const handleDeleteNotAllowed = () => {
    showToast.error("Delete from the All Job Requests page.");
  };

  // Table ke columns banao — sab functions yahan pass kar rahe hain
  const columns = getJobRequestColumns({
    onEdit: handleEditNotAllowed,
    onDelete: handleDeleteNotAllowed,
    onApprove: handleApprove,
    onReject: handleReject,
    onConvert: handleConvert,
    showApproveReject,
    showConvert,
  });

  return (
    <PageCard>
      <PageToolbar title={title} description={description} />

      {isLoading ? (
        <LoadingSkeleton />
      ) : requests.length === 0 ? (
        <EmptyState
          title={emptyText}
          description="Nothing to show here right now."
        />
      ) : (
        <DataTablePage
          columns={columns}
          data={requests}
          searchKey="requestedByName"
        />
      )}
    </PageCard>
  );
};

export default JobRequestStatusList;
