import { Controller } from "react-hook-form";

import { Input } from "@/components/ui/input";

const FrequencyFields = ({ form }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* Frequency Days */}
      <div className="space-y-2">
        <label htmlFor="frequencyDays" className="text-sm font-medium">
          Frequency (Days)
        </label>

        <Controller
          control={form.control}
          name="frequencyDays"
          render={({ field }) => (
            <Input id="frequencyDays" type="number" min={1} {...field} />
          )}
        />

        {form.formState.errors.frequencyDays && (
          <p className="text-sm text-red-500">
            {form.formState.errors.frequencyDays.message}
          </p>
        )}
      </div>

      {/* Next Due Date */}
      <div className="space-y-2">
        <label htmlFor="nextDueDate" className="text-sm font-medium">
          Next Due Date
        </label>

        <Controller
          control={form.control}
          name="nextDueDate"
          render={({ field }) => (
            <Input id="nextDueDate" type="date" {...field} />
          )}
        />

        {form.formState.errors.nextDueDate && (
          <p className="text-sm text-red-500">
            {form.formState.errors.nextDueDate.message}
          </p>
        )}
      </div>
    </div>
  );
};

export default FrequencyFields;
