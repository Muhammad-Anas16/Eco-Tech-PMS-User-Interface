import { Plus, RefreshCw } from "lucide-react";

import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";

const PageToolbar = ({
  title,
  description = "",
  // search = "",
  // onSearch,
  onRefresh,
  onAdd,
  addLabel = "Add New",
  loading = false,
  actions,
}) => {
  return (
    <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
      {/* Left Side */}
      <div className="space-y-1">
        <h2 className="text-2xl font-bold tracking-tight">{title}</h2>

        {description && (
          <p className="text-sm text-muted-foreground">{description}</p>
        )}
      </div>

      {/* Right Side */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        {/* Search */}
        {/* <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

          <Input
            placeholder="Search..."
            value={search}
            onChange={(e) => onSearch?.(e.target.value)}
            className="pl-9"
          />
        </div> */}

        {/* Custom Actions */}
        {actions}

        {/* Refresh */}
        <Button variant="outline" onClick={onRefresh} disabled={loading}>
          <RefreshCw
            className={`mr-2 h-4 w-4 ${loading ? "animate-spin" : ""}`}
          />
          Refresh
        </Button>

        {/* Add */}
        <Button onClick={onAdd}>
          <Plus className="mr-2 h-4 w-4" />

          {addLabel}
        </Button>
      </div>
    </div>
  );
};

export default PageToolbar;
