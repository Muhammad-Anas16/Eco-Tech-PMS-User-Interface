import { Button } from "@/components/ui/button";
import { Eye, Pencil, Trash2 } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PMS_STATUSES } from "@/schema/pmsSchema";

export const getPmsColumns = ({ onView, onEdit, onDelete, onStatusChange }) => [
  {
    accessorKey: "machineName",
    header: "Machine",
    cell: ({ row }) => row.original.machineName || "-",
  },
  {
    accessorKey: "technicianName",
    header: "Technician",
    cell: ({ row }) => row.original.technicianName || "Unassigned",
  },
  { accessorKey: "startDate", header: "Start Date" },
  {
    accessorKey: "endDate",
    header: "End Date",
    cell: ({ row }) => row.original.endDate || "-",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <Select
        value={row.original.status}
        onValueChange={(newStatus) => onStatusChange(row.original, newStatus)}
      >
        <SelectTrigger
          className="w-[160px]"
          onClick={(e) => e.stopPropagation()}
        >
          <SelectValue />
        </SelectTrigger>
        <SelectContent onClick={(e) => e.stopPropagation()}>
          {PMS_STATUSES.map((s) => (
            <SelectItem key={s} value={s}>
              {s}
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
      const pms = row.original;
      return (
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={(e) => {
              e.stopPropagation();
              onView(pms);
            }}
          >
            <Eye className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={(e) => {
              e.stopPropagation();
              onEdit(pms);
            }}
          >
            <Pencil className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={(e) => {
              e.stopPropagation();
              onDelete(pms);
            }}
          >
            <Trash2 className="h-4 w-4 text-destructive" />
          </Button>
        </div>
      );
    },
  },
];
