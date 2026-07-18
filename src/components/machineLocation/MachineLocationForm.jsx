import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  machineLocationSchema,
  machineLocationDefaultValues,
} from "@/schema/machineLocationSchema";

import { getMachines } from "@/api/machine.api";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const MachineLocationForm = ({ defaultValues, onSubmit, isSubmitting }) => {
  const [machines, setMachines] = useState([]);
  const [loadingMachines, setLoadingMachines] = useState(true);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(machineLocationSchema),
    defaultValues: defaultValues
      ? {
          ...defaultValues,
          machineId: String(defaultValues.machineId),
        }
      : machineLocationDefaultValues,
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
      machineId: Number(data.machineId),
    });
  };

  return (
    <form
      id="machine-location-form"
      onSubmit={handleSubmit(handleFormSubmit)}
      className="space-y-5"
    >
      {/* Machine */}
      <div className="space-y-2">
        <label className="text-sm font-medium">Machine</label>

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
          <p className="text-sm text-red-500">{errors.machineId.message}</p>
        )}
      </div>

      {/* Location Code */}
      <div className="space-y-2">
        <label className="text-sm font-medium">Location Code</label>

        <Input placeholder="e.g. L-01" {...register("locationCode")} />

        {errors.locationCode && (
          <p className="text-sm text-red-500">{errors.locationCode.message}</p>
        )}
      </div>

      {/* Location Name */}
      <div className="space-y-2">
        <label className="text-sm font-medium">Location Name</label>

        <Input
          placeholder="e.g. Ground Floor - Section A"
          {...register("locationName")}
        />

        {errors.locationName && (
          <p className="text-sm text-red-500">{errors.locationName.message}</p>
        )}
      </div>

      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? "Saving..." : "Save Location"}
      </Button>
    </form>
  );
};

export default MachineLocationForm;
