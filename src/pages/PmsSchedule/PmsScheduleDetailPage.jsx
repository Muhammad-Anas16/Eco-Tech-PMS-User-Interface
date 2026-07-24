// import { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router";
// import { getPmsScheduleById } from "@/api/pmsSchedule.api";
// import PageCard from "@/components/common/PageCard";
// import LoadingSkeleton from "@/components/common/LoadingSkeleton";
// import RecordDetailCard from "@/components/common/RecordDetailCard";
// import { Button } from "@/components/ui/button";
// import { ArrowLeft } from "lucide-react";
// import { showToast } from "../../lib/toast";

// const PmsScheduleDetailPage = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [schedule, setSchedule] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     const fetchSchedule = async () => {
//       try {
//         const response = await getPmsScheduleById(id);
//         setSchedule(response?.data || null);
//       } catch (error) {
//         showToast.error(
//           error?.response?.data?.message || "Failed to load schedule.",
//         );
//       } finally {
//         setIsLoading(false);
//       }
//     };
//     fetchSchedule();
//   }, [id]);

//   if (isLoading) return <LoadingSkeleton />;
//   if (!schedule)
//     return (
//       <PageCard>
//         <p className="text-muted-foreground">Schedule not found.</p>
//       </PageCard>
//     );

//   return (
//     <PageCard>
//       <Button
//         variant="ghost"
//         className="mb-4"
//         onClick={() => navigate("/pms-schedule")}
//       >
//         <ArrowLeft className="h-4 w-4 mr-2" />
//         Back to PMS Schedules
//       </Button>

//       <RecordDetailCard
//         title={`Schedule for ${schedule.machineName}`}
//         status={schedule.isActive ? "Active" : "Inactive"}
//         fields={[
//           { label: "Plant", value: schedule.plant },
//           { label: "2nd Machine", value: schedule.machine2Name },
//           { label: "3rd Machine", value: schedule.machine3Name },
//           { label: "4th Machine", value: schedule.machine4Name },
//           { label: "5th Machine", value: schedule.machine5Name },
//           { label: "Remarks", value: schedule.remarks },
//         ]}
//       />
//     </PageCard>
//   );
// };

// export default PmsScheduleDetailPage;

import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { getPmsScheduleById } from "@/api/pmsSchedule.api";
import PageCard from "@/components/common/PageCard";
import LoadingSkeleton from "@/components/common/LoadingSkeleton";
import RecordDetailCard from "@/components/common/RecordDetailCard";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { showToast } from "../../lib/toast";

const PmsScheduleDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [schedule, setSchedule] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        const response = await getPmsScheduleById(id);
        setSchedule(response?.data || null);
      } catch (error) {
        showToast.error(
          error?.response?.data?.message || "Failed to load schedule.",
        );
      } finally {
        setIsLoading(false);
      }
    };
    fetchSchedule();
  }, [id]);

  if (isLoading) return <LoadingSkeleton />;
  if (!schedule) {
    return (
      <PageCard>
        <p className="text-muted-foreground">Schedule not found.</p>
      </PageCard>
    );
  }

  return (
    <PageCard>
      <Button
        variant="ghost"
        className="mb-4"
        onClick={() => navigate("/pms-schedule")}
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to PMS Schedules
      </Button>

      <RecordDetailCard
        title={`Schedule for ${schedule.machineName}`}
        status={schedule.status}
        fields={[
          { label: "Plant", value: schedule.plant },
          { label: "Frequency", value: `Every ${schedule.frequencyDays} days` },
          { label: "Next Due Date", value: schedule.nextDueDate },
          // Ye 4 fields sirf tab dikhengi jab wo machine actually set ki gayi ho —
          // single-machine schedule me ye teeno "-" dikhayenge, koi crash nahi hoga
          { label: "2nd Machine", value: schedule.machine2Name },
          { label: "3rd Machine", value: schedule.machine3Name },
          { label: "4th Machine", value: schedule.machine4Name },
          { label: "5th Machine", value: schedule.machine5Name },
          { label: "Remarks", value: schedule.remarks },
        ]}
      />
    </PageCard>
  );
};

export default PmsScheduleDetailPage;
