import StatusBadge from "@/components/common/StatusBadge";
import { Button } from "@/components/ui/button";
import { Eye, Pencil, Trash2 } from "lucide-react";

// onEdit / onDelete parent (AssetPage) se pass honge
export const getAssetColumns = ({ onView, onEdit, onDelete }) => [
  {
    accessorKey: "assetCode",
    header: "Code",
  },
  {
    accessorKey: "assetName",
    header: "Asset Name",
  },
  {
    accessorKey: "category",
    header: "Category",
    cell: ({ row }) => row.original.category || "-",
  },
  {
    accessorKey: "location",
    header: "Location",
    cell: ({ row }) => row.original.location || "-",
  },
  {
    accessorKey: "manufacturer",
    header: "Manufacturer",
    cell: ({ row }) => row.original.manufacturer || "-",
  },
  {
    accessorKey: "serialNumber",
    header: "Serial No",
    cell: ({ row }) => row.original.serialNumber || "-",
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
