import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { machineSchema, machineDefaultValues } from "@/schema/machineSchema";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const STATUS_OPTIONS = ["Active", "Inactive"];

const MachineForm = ({ defaultValues, onSubmit, isSubmitting }) => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(machineSchema),
    defaultValues: defaultValues || machineDefaultValues,
  });

  return (
    <form
      id="machine-form"
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-5"
    >
      {/* Machine Code */}
      <div className="space-y-2">
        <label className="text-sm font-medium">Machine Code</label>

        <Input placeholder="e.g. M-001" {...register("machineCode")} />

        {errors.machineCode && (
          <p className="text-sm text-red-500">{errors.machineCode.message}</p>
        )}
      </div>

      {/* Machine Name */}
      <div className="space-y-2">
        <label className="text-sm font-medium">Machine Name</label>

        <Input placeholder="e.g. Compressor 1" {...register("machineName")} />

        {errors.machineName && (
          <p className="text-sm text-red-500">{errors.machineName.message}</p>
        )}
      </div>

      {/* Plant */}
      <div className="space-y-2">
        <label className="text-sm font-medium">Plant</label>

        <Input placeholder="e.g. Production Unit" {...register("plant")} />

        {errors.plant && (
          <p className="text-sm text-red-500">{errors.plant.message}</p>
        )}
      </div>

      {/* Status */}
      <div className="space-y-2">
        <label className="text-sm font-medium">Status</label>

        <Controller
          control={control}
          name="status"
          render={({ field }) => (
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select Status" />
              </SelectTrigger>

              <SelectContent>
                {STATUS_OPTIONS.map((status) => (
                  <SelectItem key={status} value={status}>
                    {status}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />

        {errors.status && (
          <p className="text-sm text-red-500">{errors.status.message}</p>
        )}
      </div>

      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? "Saving..." : "Save Machine"}
      </Button>
    </form>
  );
};

export default MachineForm;
