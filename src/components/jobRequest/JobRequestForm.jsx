import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  jobRequestSchema,
  jobRequestDefaultValues,
} from "@/schema/jobRequestSchema";

import { getMachines } from "@/api/machine.api";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const JobRequestForm = ({ defaultValues, onSubmit, isSubmitting }) => {
  const [machines, setMachines] = useState([]);
  const [loadingMachines, setLoadingMachines] = useState(true);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(jobRequestSchema),
    defaultValues: defaultValues
      ? {
          ...defaultValues,
          machineId: String(defaultValues.machineId),
        }
      : jobRequestDefaultValues,
  });

  useEffect(() => {
    const fetchMachines = async () => {
      try {
        const response = await getMachines();
        setMachines(response?.data || []);
      } catch (error) {
        console.error(error);
      } finally {
        setLoadingMachines(false);
      }
    };

    fetchMachines();
  }, []);

  const submitForm = (data) => {
    onSubmit({
      ...data,
      machineId: Number(data.machineId),
    });
  };

  return (
    <form onSubmit={handleSubmit(submitForm)} className="space-y-5">
      <div>
        <label className="mb-2 block text-sm font-medium">Machine</label>

        <Controller
          name="machineId"
          control={control}
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
          <p className="mt-1 text-sm text-red-500">
            {errors.machineId.message}
          </p>
        )}
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium">Requested By</label>

        <Input placeholder="e.g. Ali Raza" {...register("requestedByName")} />

        {errors.requestedByName && (
          <p className="mt-1 text-sm text-red-500">
            {errors.requestedByName.message}
          </p>
        )}
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium">Description</label>

        <Textarea
          placeholder="Describe the issue/request"
          {...register("description")}
        />

        {errors.description && (
          <p className="mt-1 text-sm text-red-500">
            {errors.description.message}
          </p>
        )}
      </div>

      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? "Saving..." : "Save Job Request"}
      </Button>
    </form>
  );
};

export default JobRequestForm;
