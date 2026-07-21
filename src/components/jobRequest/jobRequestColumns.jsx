import { Button } from "@/components/ui/button";
import { Eye, Pencil, Trash2 } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { JOB_REQUEST_STATUSES } from "@/schema/jobRequestSchema";

// onEdit, onDelete, onStatusChange parent (JobRequestPage) se pass honge
export const getJobRequestColumns = ({
  onView,
  onEdit,
  onDelete,
  onStatusChange,
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
    accessorKey: "status",
    header: "Status",
    // Inline status change — table se hi direct update ho jata hai
    cell: ({ row }) => (
      <Select
        value={row.original.status}
        onValueChange={(value) => onStatusChange(row.original, value)}
      >
        <SelectTrigger className="w-[140px]">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {JOB_REQUEST_STATUSES.map((status) => (
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
          onClick={() => onEdit(row.original)}
        >
          <Pencil className="h-4 w-4" />
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
