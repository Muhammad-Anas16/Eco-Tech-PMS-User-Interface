import StatusBadge from "@/components/common/StatusBadge";
import { Button } from "@/components/ui/button";
import { Eye, Trash2 } from "lucide-react";

export const getWorkOrderColumns = ({ onView, onDelete }) => [
  { accessorKey: "jobCardNo", header: "Work Order #" },
  {
    accessorKey: "machineName",
    header: "Machine",
    cell: ({ row }) => row.original.machineName || "-",
  },
  { accessorKey: "jobType", header: "Job Type" },
  {
    accessorKey: "assignedCount",
    header: "Assigned",
    cell: ({ row }) =>
      row.original.assignedCount > 0
        ? `${row.original.assignedCount} technician(s)`
        : "Unassigned",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => <StatusBadge status={row.original.status} />,
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => (
      <div className="flex gap-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onView(row.original)}
        >
          <Eye className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onDelete(row.original)}
        >
          <Trash2 className="h-4 w-4 text-destructive" />
        </Button>
      </div>
    ),
  },
];
