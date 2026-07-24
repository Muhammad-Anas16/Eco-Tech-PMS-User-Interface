// import StatusBadge from "@/components/common/StatusBadge";
// import { Button } from "@/components/ui/button";
// import { Eye, Pencil, Trash2 } from "lucide-react";

// // Parent page se onView, onEdit, onDelete milte hain
// export const getPmsScheduleColumns = ({ onView, onEdit, onDelete }) => [
//   {
//     accessorKey: "machineName",
//     header: "Primary Machine",
//     cell: ({ row }) => row.original.machineName || "-",
//   },
//   {
//     accessorKey: "plant",
//     header: "Plant",
//     cell: ({ row }) => row.original.plant || "-",
//   },
//   {
//     accessorKey: "nextDueDate",
//     header: "Next Due",
//     cell: ({ row }) => row.original.nextDueDate || "-",
//   },
//   {
//     accessorKey: "status",
//     header: "Status",
//     cell: ({ row }) => <StatusBadge status={row.original.status} />,
//   },
//   {
//     id: "actions",
//     header: "Actions",
//     cell: ({ row }) => {
//       const schedule = row.original;

//       return (
//         <div className="flex gap-2">
//           <Button
//             variant="ghost"
//             size="icon"
//             onClick={(e) => {
//               e.stopPropagation();
//               onView(schedule);
//             }}
//           >
//             <Eye className="h-4 w-4" />
//           </Button>
//           <Button
//             variant="ghost"
//             size="icon"
//             onClick={(e) => {
//               e.stopPropagation();
//               onEdit(schedule);
//             }}
//           >
//             <Pencil className="h-4 w-4" />
//           </Button>
//           <Button
//             variant="ghost"
//             size="icon"
//             onClick={(e) => {
//               e.stopPropagation();
//               onDelete(schedule);
//             }}
//           >
//             <Trash2 className="h-4 w-4 text-destructive" />
//           </Button>
//         </div>
//       );
//     },
//   },
// ];

import { Button } from "@/components/ui/button";
import { Eye, Pencil, Trash2 } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PMS_SCHEDULE_STATUSES } from "@/schema/pmsScheduleSchema";

// Parent se ab onStatusChange bhi milega — status yahin se badal sakenge
export const getPmsScheduleColumns = ({
  onView,
  onEdit,
  onDelete,
  onStatusChange,
}) => [
  {
    accessorKey: "machineName",
    header: "Primary Machine",
    cell: ({ row }) => row.original.machineName || "-",
  },
  {
    accessorKey: "plant",
    header: "Plant",
    cell: ({ row }) => row.original.plant || "-",
  },
  {
    accessorKey: "nextDueDate",
    header: "Next Due",
    cell: ({ row }) => row.original.nextDueDate || "-",
  },
  {
    accessorKey: "status",
    header: "Status",
    // Ab dropdown hai — click karte hi status change ho jayega, table se hi
    cell: ({ row }) => (
      <Select
        value={row.original.status}
        onValueChange={(newStatus) => onStatusChange(row.original, newStatus)}
      >
        {/* stopPropagation zaroori hai warna dropdown click se row bhi
            navigate ho jayegi (agar row-click enabled hai) */}
        <SelectTrigger
          className="w-[140px]"
          onClick={(e) => e.stopPropagation()}
        >
          <SelectValue />
        </SelectTrigger>
        <SelectContent onClick={(e) => e.stopPropagation()}>
          {PMS_SCHEDULE_STATUSES.map((status) => (
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
      const schedule = row.original;

      return (
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={(e) => {
              e.stopPropagation();
              onView(schedule);
            }}
          >
            <Eye className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={(e) => {
              e.stopPropagation();
              onEdit(schedule);
            }}
          >
            <Pencil className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={(e) => {
              e.stopPropagation();
              onDelete(schedule);
            }}
          >
            <Trash2 className="h-4 w-4 text-destructive" />
          </Button>
        </div>
      );
    },
  },
];
