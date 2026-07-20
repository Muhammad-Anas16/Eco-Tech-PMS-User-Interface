import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  jobCardTimingSchema,
  jobCardTimingDefaultValues,
} from "@/schema/jobCardSchema";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";

const JobCardTimingForm = ({ defaultValues, onSubmit, isSubmitting }) => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(jobCardTimingSchema),
    defaultValues: defaultValues || jobCardTimingDefaultValues,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Start Time + End Time */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="mb-2 block text-sm font-medium">Start Time</label>

          <Input type="datetime-local" {...register("startTime")} />

          {errors.startTime && (
            <p className="mt-1 text-sm text-red-500">
              {errors.startTime.message}
            </p>
          )}
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">End Time</label>

          <Input type="datetime-local" {...register("endTime")} />

          {errors.endTime && (
            <p className="mt-1 text-sm text-red-500">
              {errors.endTime.message}
            </p>
          )}
        </div>
      </div>

      {/* Sub Location + Plant */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="mb-2 block text-sm font-medium">Sub Location</label>

          <Input placeholder="e.g. Section A" {...register("subLocation")} />

          {errors.subLocation && (
            <p className="mt-1 text-sm text-red-500">
              {errors.subLocation.message}
            </p>
          )}
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">Plant</label>

          <Input placeholder="e.g. Production Unit" {...register("plant")} />

          {errors.plant && (
            <p className="mt-1 text-sm text-red-500">{errors.plant.message}</p>
          )}
        </div>
      </div>

      {/* Expense Type */}
      <div>
        <label className="mb-2 block text-sm font-medium">Expense Type</label>

        <Input placeholder="Optional" {...register("expenseType")} />

        {errors.expenseType && (
          <p className="mt-1 text-sm text-red-500">
            {errors.expenseType.message}
          </p>
        )}
      </div>

      {/* Remarks */}
      <div>
        <label className="mb-2 block text-sm font-medium">Remarks</label>

        <Textarea placeholder="Optional notes" {...register("remarks")} />

        {errors.remarks && (
          <p className="mt-1 text-sm text-red-500">{errors.remarks.message}</p>
        )}
      </div>

      {/* Machine Stop */}
      <div className="flex items-center justify-between rounded-lg border p-4">
        <div>
          <label className="text-sm font-medium">Machine Stopped?</label>

          {errors.machineStop && (
            <p className="mt-1 text-sm text-red-500">
              {errors.machineStop.message}
            </p>
          )}
        </div>

        <Controller
          control={control}
          name="machineStop"
          render={({ field }) => (
            <Switch checked={field.value} onCheckedChange={field.onChange} />
          )}
        />
      </div>

      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? "Saving..." : "Save Timing & Details"}
      </Button>
    </form>
  );
};

export default JobCardTimingForm;
