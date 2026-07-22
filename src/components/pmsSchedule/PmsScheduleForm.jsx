import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";

import {
  pmsScheduleSchema,
  pmsScheduleDefaultValues,
} from "@/schema/pmsScheduleSchema";

import { useMachines } from "./useMachines";
import MachineSelect from "./MachineSelect";
import MachineGroup from "./MachineGroup";
import PlantField from "./PlantField";
import FrequencyFields from "./FrequencyFields";
import StatusField from "./StatusField";
import RemarksField from "./RemarksField";
import ActiveSwitch from "./ActiveSwitch";

const NONE = "none";

const PmsScheduleForm = ({ defaultValues, onSubmit, isSubmitting = false }) => {
  const { machines, loading } = useMachines();

  const form = useForm({
    resolver: zodResolver(pmsScheduleSchema),
    defaultValues: defaultValues
      ? {
          machineId: String(defaultValues.machineId),

          machine2Id: defaultValues.machine2Id
            ? String(defaultValues.machine2Id)
            : NONE,

          machine3Id: defaultValues.machine3Id
            ? String(defaultValues.machine3Id)
            : NONE,

          machine4Id: defaultValues.machine4Id
            ? String(defaultValues.machine4Id)
            : NONE,

          machine5Id: defaultValues.machine5Id
            ? String(defaultValues.machine5Id)
            : NONE,

          plant: defaultValues.plant || "",

          remarks: defaultValues.remarks || "",

          frequencyDays: defaultValues.frequencyDays ?? 30,

          nextDueDate: defaultValues.nextDueDate || "",

          status: defaultValues.status || "Active",

          isActive: Boolean(defaultValues.isActive),
        }
      : pmsScheduleDefaultValues,
  });

  const toId = (value) => (value && value !== NONE ? Number(value) : null);

  const handleSubmit = (data) => {
    onSubmit({
      machineId: Number(data.machineId),

      machine2Id: toId(data.machine2Id),
      machine3Id: toId(data.machine3Id),
      machine4Id: toId(data.machine4Id),
      machine5Id: toId(data.machine5Id),

      plant: data.plant,

      remarks: data.remarks,

      frequencyDays: Number(data.frequencyDays),

      nextDueDate: data.nextDueDate,

      status: data.status,

      isActive: data.isActive,
    });
  };

  return (
    <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
      <MachineSelect
        form={form}
        name="machineId"
        label="Primary Machine"
        machines={machines}
        loading={loading}
      />

      <MachineGroup
        form={form}
        leftName="machine2Id"
        leftLabel="2nd Machine"
        rightName="machine3Id"
        rightLabel="3rd Machine"
        machines={machines}
        loading={loading}
      />

      <MachineGroup
        form={form}
        leftName="machine4Id"
        leftLabel="4th Machine"
        rightName="machine5Id"
        rightLabel="5th Machine"
        machines={machines}
        loading={loading}
      />

      <PlantField form={form} />

      <FrequencyFields form={form} />

      <StatusField form={form} />

      <RemarksField form={form} />

      <ActiveSwitch form={form} />

      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? "Saving..." : "Save Schedule"}
      </Button>
    </form>
  );
};

export default PmsScheduleForm;
