import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { operatorSchema, operatorDefaultValues } from "@/schema/operatorSchema";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";

const OperatorForm = ({ defaultValues, onSubmit, isSubmitting }) => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(operatorSchema),
    defaultValues: defaultValues
      ? {
          ...defaultValues,
          isActive: Boolean(defaultValues.isActive),
        }
      : operatorDefaultValues,
  });

  return (
    <form
      id="operator-form"
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-5"
    >
      {/* Operator Code */}
      <div className="space-y-2">
        <label className="text-sm font-medium">Operator Code</label>

        <Input placeholder="e.g. OP-001" {...register("operatorCode")} />

        {errors.operatorCode && (
          <p className="text-sm text-destructive">
            {errors.operatorCode.message}
          </p>
        )}
      </div>

      {/* Operator Name */}
      <div className="space-y-2">
        <label className="text-sm font-medium">Operator Name</label>

        <Input placeholder="e.g. Ali Raza" {...register("operatorName")} />

        {errors.operatorName && (
          <p className="text-sm text-destructive">
            {errors.operatorName.message}
          </p>
        )}
      </div>

      {/* Plant Name */}
      <div className="space-y-2">
        <label className="text-sm font-medium">Plant Name</label>

        <Input placeholder="e.g. Production Unit" {...register("plantName")} />

        {errors.plantName && (
          <p className="text-sm text-destructive">{errors.plantName.message}</p>
        )}
      </div>

      {/* Active */}
      <div className="flex items-center justify-between rounded-xl border p-4">
        <div>
          <h4 className="font-medium">Active</h4>

          <p className="text-sm text-muted-foreground">
            Inactive operators won't appear in dropdowns.
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
        {isSubmitting ? "Saving..." : "Save Operator"}
      </Button>
    </form>
  );
};

export default OperatorForm;
