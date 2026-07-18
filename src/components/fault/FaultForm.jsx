import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { faultSchema, faultDefaultValues } from "@/schema/faultSchema";

import { getMachines } from "@/api/machine.api";

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

const NO_MACHINE = "none";

const FaultForm = ({ defaultValues, onSubmit, isSubmitting }) => {
  const [machines, setMachines] = useState([]);
  const [loadingMachines, setLoadingMachines] = useState(true);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(faultSchema),
    defaultValues: defaultValues
      ? {
          ...defaultValues,
          machineId: defaultValues.machineId
            ? String(defaultValues.machineId)
            : NO_MACHINE,
          isActive: Boolean(defaultValues.isActive),
        }
      : faultDefaultValues,
  });

  useEffect(() => {
    const fetchMachines = async () => {
      try {
        const response = await getMachines();
        setMachines(response?.data || []);
      } catch (error) {
        console.error("Failed to load machines:", error);
      } finally {
        setLoadingMachines(false);
      }
    };

    fetchMachines();
  }, []);

  const handleFormSubmit = (data) => {
    onSubmit({
      ...data,
      machineId:
        data.machineId && data.machineId !== NO_MACHINE
          ? Number(data.machineId)
          : null,
    });
  };

  return (
    <form
      id="fault-form"
      onSubmit={handleSubmit(handleFormSubmit)}
      className="space-y-5"
    >
      {/* Fault Name */}
      <div className="space-y-2">
        <label className="text-sm font-medium">Fault Name</label>

        <Input
          placeholder="e.g. Motor Overheating"
          {...register("faultName")}
        />

        {errors.faultName && (
          <p className="text-sm text-destructive">{errors.faultName.message}</p>
        )}
      </div>

      {/* Machine */}
      <div className="space-y-2">
        <label className="text-sm font-medium">Machine (Optional)</label>

        <Controller
          control={control}
          name="machineId"
          render={({ field }) => (
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger>
                <SelectValue
                  placeholder={
                    loadingMachines ? "Loading machines..." : "Select Machine"
                  }
                />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value={NO_MACHINE}>None (General Fault)</SelectItem>

                {machines.map((machine) => (
                  <SelectItem key={machine.id} value={String(machine.id)}>
                    {machine.machineName} ({machine.machineCode})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />

        {errors.machineId && (
          <p className="text-sm text-destructive">{errors.machineId.message}</p>
        )}
      </div>

      {/* Active */}
      <div className="flex items-center justify-between rounded-xl border p-4">
        <div>
          <h4 className="font-medium">Active</h4>

          <p className="text-sm text-muted-foreground">
            Inactive faults won't appear in the active fault list.
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
        {isSubmitting ? "Saving..." : "Save Fault"}
      </Button>
    </form>
  );
};

export default FaultForm;
