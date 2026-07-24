// import { Button } from "@/components/ui/button";
// import { Eye, Pencil, Trash2 } from "lucide-react";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { JOB_REQUEST_STATUSES } from "@/schema/jobRequestSchema";

// // onEdit, onDelete, onStatusChange parent (JobRequestPage) se pass honge
// export const getJobRequestColumns = ({
//   onView,
//   onEdit,
//   onDelete,
//   onStatusChange,
// }) => [
//   {
//     accessorKey: "machineName",
//     header: "Machine",
//     cell: ({ row }) => row.original.machineName || "-",
//   },
//   {
//     accessorKey: "requestedByName",
//     header: "Requested By",
//   },
//   {
//     accessorKey: "description",
//     header: "Description",
//     cell: ({ row }) => row.original.description || "-",
//   },
//   {
//     accessorKey: "status",
//     header: "Status",
//     // Inline status change — table se hi direct update ho jata hai
//     cell: ({ row }) => (
//       <Select
//         value={row.original.status}
//         onValueChange={(value) => onStatusChange(row.original, value)}
//       >
//         <SelectTrigger className="w-[140px]">
//           <SelectValue />
//         </SelectTrigger>
//         <SelectContent>
//           {JOB_REQUEST_STATUSES.map((status) => (
//             <SelectItem key={status} value={status}>
//               {status}
//             </SelectItem>
//           ))}
//         </SelectContent>
//       </Select>
//     ),
//   },
//   {
//     id: "actions",
//     header: "Actions",
//     cell: ({ row }) => (
//       <div className="flex gap-2">
//         <Button
//           variant="ghost"
//           size="icon"
//           onClick={() => onView(row.original)}
//         >
//           <Eye className="h-4 w-4" />
//         </Button>
//         <Button
//           variant="ghost"
//           size="icon"
//           onClick={() => onEdit(row.original)}
//         >
//           <Pencil className="h-4 w-4" />
//         </Button>
//         <Button
//           variant="ghost"
//           size="icon"
//           onClick={() => onDelete(row.original)}
//         >
//           <Trash2 className="h-4 w-4 text-destructive" />
//         </Button>
//       </div>
//     ),
//   },
// ];

import { Button } from "@/components/ui/button";
import { Eye, Pencil, Trash2, Check, X, ArrowRightCircle } from "lucide-react";
import StatusBadge from "@/components/common/StatusBadge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { JOB_REQUEST_STATUSES } from "@/schema/jobRequestSchema";

// Ye function table ke "columns" (yaani konsi konsi columns dikhengi) return karta hai.
// Parent page (jaise JobRequestStatusList.jsx) hume kuch functions deta hai —
// hum unhe destructure kar ke yahan use karte hain.
//
// showApproveReject -> true ho to Approve/Reject buttons dikhenge (Pending page pe)
// showConvert       -> true ho to "Convert to Work Order" button dikhega (Approved page pe)
export const getJobRequestColumns = ({
  onView,
  onEdit,
  onDelete,
  onApprove,
  onReject,
  onConvert,
  onStatusChange,
  showApproveReject = false,
  showConvert = false,
}) => [
  {
    accessorKey: "machineName",
    header: "Machine",
    cell: ({ row }) => row.original.machineName || "-",
  },
  {
    accessorKey: "requestedByName",
    header: "Requested By",
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => row.original.description || "-",
  },
  {
    // Status column — 2 tareeke se dikh sakta hai:
    // 1) Agar onStatusChange diya gaya ho -> dropdown (manually change kar sakte ho)
    // 2) Agar nahi diya gaya -> sirf ek badge (sirf dikhane ke liye, edit nahi hoga)
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      if (onStatusChange) {
        return (
          <Select
            value={row.original.status}
            onValueChange={(newStatus) =>
              onStatusChange(row.original, newStatus)
            }
          >
            <SelectTrigger
              className="w-[140px]"
              onClick={(e) => e.stopPropagation()}
            >
              <SelectValue />
            </SelectTrigger>
            <SelectContent onClick={(e) => e.stopPropagation()}>
              {JOB_REQUEST_STATUSES.map((status) => (
                <SelectItem key={status} value={status}>
                  {status}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );
      }

      return <StatusBadge status={row.original.status} />;
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const request = row.original;

      // Yahan hum ek chhoti si list (array) banate hain — is list me
      // sirf wahi buttons hongi jo is particular row ke liye sahi hain.
      // Phir neeche .map() se ye sab buttons ek sath render kar dete hain.
      const actionButtons = [];

      // Approve / Reject — sirf Pending status pe, aur sirf jab
      // parent page ne "showApproveReject" true bhej ke bola ho
      if (showApproveReject && request.status === "Pending") {
        actionButtons.push({
          key: "approve",
          label: "Approve",
          Icon: Check,
          extraClass: "text-green-600 border-green-600 hover:bg-green-50",
          onClick: () => onApprove(request),
        });

        actionButtons.push({
          key: "reject",
          label: "Reject",
          Icon: X,
          extraClass: "text-red-600 border-red-600 hover:bg-red-50",
          onClick: () => onReject(request),
        });
      }

      // Convert to Work Order — sirf Approved status pe
      if (showConvert && request.status === "Approved") {
        if (request.jobCardId) {
          // Already convert ho chuka hai — button ki jagah bas text dikhao
          actionButtons.push({
            key: "already-converted",
            label: "Converted",
            disabled: true,
          });
        } else {
          actionButtons.push({
            key: "convert",
            label: "Convert to Work Order",
            Icon: ArrowRightCircle,
            onClick: () => onConvert(request),
          });
        }
      }

      return (
        <div className="flex flex-wrap items-center gap-2">
          {/* Pehle wo buttons dikhao jo upar list me add hue (Approve/Reject/Convert) */}
          {actionButtons.map((btn) => (
            <Button
              key={btn.key}
              variant="outline"
              size="sm"
              disabled={btn.disabled}
              className={btn.extraClass}
              onClick={btn.onClick}
            >
              {btn.Icon && <btn.Icon className="h-4 w-4 mr-1" />}
              {btn.label}
            </Button>
          ))}

          {/* Ye 3 icon-buttons hamesha dikhenge (agar function diya gaya ho) */}
          {onView && (
            <Button variant="ghost" size="icon" onClick={() => onView(request)}>
              <Eye className="h-4 w-4" />
            </Button>
          )}
          {onEdit && (
            <Button variant="ghost" size="icon" onClick={() => onEdit(request)}>
              <Pencil className="h-4 w-4" />
            </Button>
          )}
          {onDelete && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onDelete(request)}
            >
              <Trash2 className="h-4 w-4 text-destructive" />
            </Button>
          )}
        </div>
      );
    },
  },
];
