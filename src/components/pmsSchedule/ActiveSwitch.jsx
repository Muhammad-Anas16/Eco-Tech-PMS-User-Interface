import { Controller } from "react-hook-form";

import { Switch } from "@/components/ui/switch";

const ActiveSwitch = ({ form }) => {
  return (
    <div className="flex items-center justify-between rounded-lg border p-4">
      <div className="space-y-1">
        <label className="text-sm font-medium">Active</label>

        <p className="text-sm text-muted-foreground">
          Inactive schedules won't generate new PMS jobs.
        </p>
      </div>

      <Controller
        control={form.control}
        name="isActive"
        render={({ field }) => (
          <Switch checked={field.value} onCheckedChange={field.onChange} />
        )}
      />
    </div>
  );
};

export default ActiveSwitch;
