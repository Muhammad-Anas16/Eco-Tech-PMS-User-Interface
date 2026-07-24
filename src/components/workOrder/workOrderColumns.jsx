// import StatusBadge from "@/components/common/StatusBadge";
// import { Button } from "@/components/ui/button";
// import { Eye, Trash2 } from "lucide-react";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { JOB_CARD_STATUSES } from "@/schema/jobCardSchema";

// export const getWorkOrderColumns = ({ onView, onDelete, onStatusChange }) => [
//   { accessorKey: "jobCardNo", header: "Work Order #" },
//   {
//     accessorKey: "machineName",
//     header: "Machine",
//     cell: ({ row }) => row.original.machineName || "-",
//   },
//   { accessorKey: "jobType", header: "Job Type" },
//   {
//     accessorKey: "assignedCount",
//     header: "Assigned",
//     cell: ({ row }) =>
//       row.original.assignedCount > 0
//         ? `${row.original.assignedCount} technician(s)`
//         : "Unassigned",
//   },
//   {
//     accessorKey: "status",
//     header: "Status",
//     // Ab yahan se hi status change ho sakta hai — detail page pe jaane ki zaroorat nahi
//     cell: ({ row }) => (
//       <Select
//         value={row.original.status}
//         onValueChange={(value) => onStatusChange(row.original, value)}
//       >
//         <SelectTrigger
//           className="w-[140px]"
//           onClick={(e) => e.stopPropagation()}
//         >
//           <SelectValue />
//         </SelectTrigger>
//         <SelectContent onClick={(e) => e.stopPropagation()}>
//           {JOB_CARD_STATUSES.map((s) => (
//             <SelectItem key={s} value={s}>
//               {s}
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
//           onClick={() => onDelete(row.original)}
//         >
//           <Trash2 className="h-4 w-4 text-destructive" />
//         </Button>
//       </div>
//     ),
//   },
// ];

import { Button } from "@/components/ui/button";
import { Eye, Trash2 } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { JOB_CARD_STATUSES } from "@/schema/jobCardSchema";

// Ye function Work Orders table ke columns banata hai.
// Parent page se hume 3 functions milte hain: onView, onDelete, onStatusChange
export const getWorkOrderColumns = ({ onView, onDelete, onStatusChange }) => [
  {
    accessorKey: "jobCardNo",
    header: "Work Order #",
  },
  {
    accessorKey: "machineName",
    header: "Machine",
    cell: ({ row }) => row.original.machineName || "-",
  },
  {
    accessorKey: "jobType",
    header: "Job Type",
  },
  {
    accessorKey: "assignedCount",
    header: "Assigned",
    cell: ({ row }) => {
      const count = row.original.assignedCount;
      return count > 0 ? `${count} technician(s)` : "Unassigned";
    },
  },
  {
    // Status yahan se hi change ho sakta hai — dropdown ki tarah
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <Select
        value={row.original.status}
        onValueChange={(newStatus) => onStatusChange(row.original, newStatus)}
      >
        {/* stopPropagation isliye lagaya hai taake dropdown click karne se
            row-click (jo detail page kholta hai) trigger na ho jaye */}
        <SelectTrigger
          className="w-[140px]"
          onClick={(e) => e.stopPropagation()}
        >
          <SelectValue />
        </SelectTrigger>
        <SelectContent onClick={(e) => e.stopPropagation()}>
          {JOB_CARD_STATUSES.map((status) => (
            <SelectItem key={status} value={status}>
              {status}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    ),
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const order = row.original;

      // Yahan bhi hum buttons ki ek chhoti list banate hain,
      // phir .map() se render karte hain — isse pattern
      // baaki columns files jaisa hi consistent rehta hai
      const actionButtons = [
        { key: "view", Icon: Eye, onClick: () => onView(order) },
        {
          key: "delete",
          Icon: Trash2,
          danger: true,
          onClick: () => onDelete(order),
        },
      ];

      return (
        <div className="flex gap-2">
          {actionButtons.map((btn) => (
            <Button
              key={btn.key}
              variant="ghost"
              size="icon"
              onClick={(e) => {
                e.stopPropagation(); // row-click ko rokne ke liye
                btn.onClick();
              }}
            >
              <btn.Icon
                className={`h-4 w-4 ${btn.danger ? "text-destructive" : ""}`}
              />
            </Button>
          ))}
        </div>
      );
    },
  },
];
