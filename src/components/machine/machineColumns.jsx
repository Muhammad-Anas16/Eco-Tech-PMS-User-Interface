// import StatusBadge from "@/components/common/StatusBadge";
// import { Button } from "@/components/ui/button";
// import { Pencil, Trash2 } from "lucide-react";

// // onEdit / onDelete parent (MachinePage) se pass honge
// export const getMachineColumns = ({ onEdit, onDelete }) => [
//   {
//     accessorKey: "machineCode",
//     header: "Code",
//   },
//   {
//     accessorKey: "machineName",
//     header: "Machine Name",
//   },
//   {
//     accessorKey: "plant",
//     header: "Plant",
//     cell: ({ row }) => row.original.plant || "-",
//   },
//   {
//     accessorKey: "status",
//     header: "Status",
//     cell: ({ row }) => <StatusBadge status={row.original.status} />,
//   },
//   {
//     id: "actions",
//     header: "Actions",
//     cell: ({ row }) => (
//       <div className="flex gap-2">
//         <Button
//           variant="ghost"
//           size="icon"
//           onClick={() => onEdit(row.original)}
//         >
//           <Pencil className="h-4 w-4" />
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

import StatusBadge from "@/components/common/StatusBadge";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2, Eye } from "lucide-react";

// onView (naya) — Detail page kholega. onEdit — modal kholega (jaisa pehle tha)
export const getMachineColumns = ({ onView, onEdit, onDelete }) => [
  { accessorKey: "machineCode", header: "Code" },
  { accessorKey: "machineName", header: "Machine Name" },
  {
    accessorKey: "plant",
    header: "Plant",
    cell: ({ row }) => row.original.plant || "-",
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
