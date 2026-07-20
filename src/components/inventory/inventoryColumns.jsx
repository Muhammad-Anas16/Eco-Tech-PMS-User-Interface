import StatusBadge from "@/components/common/StatusBadge";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";

// onEdit / onDelete parent (InventoryPage) se pass honge
export const getInventoryColumns = ({ onEdit, onDelete }) => [
  {
    accessorKey: "itemCode",
    header: "Code",
  },
  {
    accessorKey: "itemName",
    header: "Item Name",
  },
  {
    accessorKey: "category",
    header: "Category",
    cell: ({ row }) => row.original.category || "-",
  },
  {
    accessorKey: "quantity",
    header: "Quantity",
    cell: ({ row }) => {
      const { quantity, unit, minimumStock } = row.original;
      const isLow = quantity <= minimumStock;
      return (
        <span className={isLow ? "text-destructive font-medium" : ""}>
          {quantity} {unit || ""}
        </span>
      );
    },
  },
  {
    accessorKey: "location",
    header: "Location",
    cell: ({ row }) => row.original.location || "-",
  },
  {
    accessorKey: "supplier",
    header: "Supplier",
    cell: ({ row }) => row.original.supplier || "-",
  },
  {
    accessorKey: "unitPrice",
    header: "Unit Price",
    cell: ({ row }) => `Rs. ${Number(row.original.unitPrice || 0).toFixed(2)}`,
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
