import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  technicianSchema,
  technicianDefaultValues,
} from "@/schema/technicianSchema";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const TYPE_OPTIONS = ["Internal", "External"];

const TechnicianForm = ({ defaultValues, onSubmit, isSubmitting }) => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(technicianSchema),
    defaultValues: defaultValues
      ? {
          ...defaultValues,
          isActive: Boolean(defaultValues.isActive),
        }
      : technicianDefaultValues,
  });

  return (
    <form
      id="technician-form"
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-5"
    >
      {/* Technician Code + Employee Code */}
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <label className="text-sm font-medium">Technician Code</label>

          <Input placeholder="e.g. T-001" {...register("techCode")} />

          {errors.techCode && (
            <p className="text-sm text-destructive">
              {errors.techCode.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Employee Code</label>

          <Input placeholder="e.g. EMP-101" {...register("employeeCode")} />

          {errors.employeeCode && (
            <p className="text-sm text-destructive">
              {errors.employeeCode.message}
            </p>
          )}
        </div>
      </div>

      {/* Technician Name */}
      <div className="space-y-2">
        <label className="text-sm font-medium">Technician Name</label>

        <Input placeholder="e.g. Kamran Ahmed" {...register("techName")} />

        {errors.techName && (
          <p className="text-sm text-destructive">{errors.techName.message}</p>
        )}
      </div>

      {/* Designation + Cell Number */}
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <label className="text-sm font-medium">Designation</label>

          <Input
            placeholder="e.g. Electrician"
            {...register("techDesignation")}
          />

          {errors.techDesignation && (
            <p className="text-sm text-destructive">
              {errors.techDesignation.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Cell Number</label>

          <Input placeholder="e.g. 0300-1234567" {...register("cellNo")} />

          {errors.cellNo && (
            <p className="text-sm text-destructive">{errors.cellNo.message}</p>
          )}
        </div>
      </div>

      {/* Plant + Type */}
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <label className="text-sm font-medium">Plant Name</label>

          <Input
            placeholder="e.g. Production Unit"
            {...register("plantName")}
          />

          {errors.plantName && (
            <p className="text-sm text-destructive">
              {errors.plantName.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Type</label>

          <Controller
            control={control}
            name="type"
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Type" />
                </SelectTrigger>

                <SelectContent>
                  {TYPE_OPTIONS.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />

          {errors.type && (
            <p className="text-sm text-destructive">{errors.type.message}</p>
          )}
        </div>
      </div>

      {/* Active */}
      <div className="flex items-center justify-between rounded-xl border p-4">
        <div>
          <h4 className="font-medium">Active</h4>

          <p className="text-sm text-muted-foreground">
            Inactive technicians won't appear in dropdowns.
          </p>
        </div>

        <Controller
          control={control}
          name="isActive"
          render={({ field }) => (
            <Switch checked={field.value} onCheckedChange={field.onChange} />
          )}
        />
      </div>

      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? "Saving..." : "Save Technician"}
      </Button>
    </form>
  );
};

export default TechnicianForm;
