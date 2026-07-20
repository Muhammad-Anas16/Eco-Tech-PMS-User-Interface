import StatusBadge from "@/components/common/StatusBadge";
import { Button } from "@/components/ui/button";
import { Eye, Trash2 } from "lucide-react";

// onView / onDelete parent (JobCardPage) se pass honge
export const getJobCardColumns = ({ onView, onDelete }) => [
  {
    accessorKey: "jobCardNo",
    header: "Job Card #",
  },
  {
    accessorKey: "machineName",
    header: "Machine",
    cell: ({ row }) => row.original.machineName || "-",
  },
  {
    accessorKey: "faultName",
    header: "Fault",
    cell: ({ row }) => row.original.faultName || "-",
  },
  {
    accessorKey: "jobType",
    header: "Job Type",
  },
  {
    accessorKey: "machineStop",
    header: "Machine Stop",
    cell: ({ row }) => (row.original.machineStop ? "Yes" : "No"),
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
