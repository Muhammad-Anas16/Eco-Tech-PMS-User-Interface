import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const STATUS_VARIANTS = {
  // Generic
  active: {
    label: "Active",
    className:
      "bg-emerald-100 text-emerald-700 border border-emerald-200 hover:bg-emerald-100",
  },
  inactive: {
    label: "Inactive",
    className:
      "bg-slate-100 text-slate-700 border border-slate-200 hover:bg-slate-100",
  },

  // Machine
  running: {
    label: "Running",
    className:
      "bg-green-100 text-green-700 border border-green-200 hover:bg-green-100",
  },
  stopped: {
    label: "Stopped",
    className: "bg-red-100 text-red-700 border border-red-200 hover:bg-red-100",
  },
  maintenance: {
    label: "Maintenance",
    className:
      "bg-amber-100 text-amber-700 border border-amber-200 hover:bg-amber-100",
  },

  // Work Orders
  pending: {
    label: "Pending",
    className:
      "bg-yellow-100 text-yellow-700 border border-yellow-200 hover:bg-yellow-100",
  },
  completed: {
    label: "Completed",
    className:
      "bg-blue-100 text-blue-700 border border-blue-200 hover:bg-blue-100",
  },
  cancelled: {
    label: "Cancelled",
    className: "bg-red-100 text-red-700 border border-red-200 hover:bg-red-100",
  },

  // Users
  online: {
    label: "Online",
    className:
      "bg-green-100 text-green-700 border border-green-200 hover:bg-green-100",
  },
  offline: {
    label: "Offline",
    className:
      "bg-gray-100 text-gray-700 border border-gray-200 hover:bg-gray-100",
  },
};

const StatusBadge = ({ status, className = "", size = "default" }) => {
  const key = String(status || "").toLowerCase();

  const config = STATUS_VARIANTS[key] || {
    label: status || "Unknown",
    className:
      "bg-gray-100 text-gray-700 border border-gray-200 hover:bg-gray-100",
  };

  return (
    <Badge
      variant="outline"
      className={cn(
        "rounded-full font-medium capitalize transition-colors",
        size === "sm" && "px-2 py-0 text-[11px]",
        size === "default" && "px-3 py-1 text-xs",
        size === "lg" && "px-4 py-1.5 text-sm",
        config.className,
        className,
      )}
    >
      {config.label}
    </Badge>
  );
};

export default StatusBadge;
