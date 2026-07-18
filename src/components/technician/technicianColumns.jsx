import StatusBadge from "@/components/common/StatusBadge";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";

// onEdit / onDelete parent (TechnicianPage) se pass honge
export const getTechnicianColumns = ({ onEdit, onDelete }) => [
  {
    accessorKey: "techCode",
    header: "Code",
  },
  {
    accessorKey: "techName",
    header: "Technician Name",
  },
  {
    accessorKey: "techDesignation",
    header: "Designation",
    cell: ({ row }) => row.original.techDesignation || "-",
  },
  {
    accessorKey: "cellNo",
    header: "Cell No",
    cell: ({ row }) => row.original.cellNo || "-",
  },
  {
    accessorKey: "plantName",
    header: "Plant",
    cell: ({ row }) => row.original.plantName || "-",
  },
  {
    accessorKey: "type",
    header: "Type",
  },
  {
    accessorKey: "isActive",
    header: "Status",
    cell: ({ row }) => (
      <StatusBadge status={row.original.isActive ? "Active" : "Inactive"} />
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
