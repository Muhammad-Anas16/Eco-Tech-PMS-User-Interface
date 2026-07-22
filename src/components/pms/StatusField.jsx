import { Controller } from "react-hook-form";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { PMS_STATUSES } from "@/schema/pmsSchema";

const StatusField = ({ form }) => {
  return (
    <div className="space-y-2">
      <label htmlFor="status" className="text-sm font-medium">
        Status
      </label>

      <Controller
        control={form.control}
        name="status"
        render={({ field }) => (
          <Select value={field.value} onValueChange={field.onChange}>
            <SelectTrigger id="status">
              <SelectValue placeholder="Select Status" />
            </SelectTrigger>

            <SelectContent>
              {PMS_STATUSES.map((status) => (
                <SelectItem key={status} value={status}>
                  {status}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      />

      {form.formState.errors.status && (
        <p className="text-sm text-destructive">
          {form.formState.errors.status.message}
        </p>
      )}
    </div>
  );
};

export default StatusField;
