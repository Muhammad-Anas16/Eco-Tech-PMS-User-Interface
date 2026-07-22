import { Controller } from "react-hook-form";
import { Input } from "@/components/ui/input";

const DateFields = ({ form }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* Start Date */}
      <div className="space-y-2">
        <label htmlFor="startDate" className="text-sm font-medium">
          Start Date
        </label>

        <Controller
          control={form.control}
          name="startDate"
          render={({ field }) => (
            <Input id="startDate" type="date" {...field} />
          )}
        />

        {form.formState.errors.startDate && (
          <p className="text-sm text-destructive">
            {form.formState.errors.startDate.message}
          </p>
        )}
      </div>

      {/* End Date */}
      <div className="space-y-2">
        <label htmlFor="endDate" className="text-sm font-medium">
          End Date
        </label>

        <Controller
          control={form.control}
          name="endDate"
          render={({ field }) => <Input id="endDate" type="date" {...field} />}
        />

        {form.formState.errors.endDate && (
          <p className="text-sm text-destructive">
            {form.formState.errors.endDate.message}
          </p>
        )}
      </div>
    </div>
  );
};

export default DateFields;
