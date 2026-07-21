import StatusBadge from "@/components/common/StatusBadge";
import { Button } from "@/components/ui/button";
import { Eye, Pencil, Trash2 } from "lucide-react";

// onEdit / onDelete parent (AuthorityPage) se pass honge
export const getAuthorityColumns = ({ onView, onEdit, onDelete }) => [
  {
    accessorKey: "authorityName",
    header: "Authority Name",
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => row.original.description || "-",
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
