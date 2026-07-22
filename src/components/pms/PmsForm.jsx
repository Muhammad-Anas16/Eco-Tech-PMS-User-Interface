import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { pmsSchema, pmsDefaultValues } from "@/schema/pmsSchema";

import { usePmsData } from "./usePmsData";

import MachineField from "./MachineField";
import TechnicianField from "./TechnicianField";
import DateFields from "./DateFields";
import StatusField from "./StatusField";
import RemarksField from "./RemarksField";
import SubmitButton from "./SubmitButton";

const PmsForm = ({ defaultValues, onSubmit, isSubmitting = false }) => {
  const { machines, technicians, loading } = usePmsData();

  const form = useForm({
    resolver: zodResolver(pmsSchema),
    defaultValues: defaultValues
      ? {
          ...defaultValues,
          machineId: String(defaultValues.machineId),
          assignedTechnicianId: defaultValues.assignedTechnicianId
            ? String(defaultValues.assignedTechnicianId)
            : "none",
        }
      : {
          ...pmsDefaultValues,
          assignedTechnicianId: "none",
        },
  });

  const submit = (data) => {
    onSubmit({
      ...data,
      machineId: Number(data.machineId),
      assignedTechnicianId:
        data.assignedTechnicianId && data.assignedTechnicianId !== "none"
          ? Number(data.assignedTechnicianId)
          : null,
    });
  };

  return (
    <form onSubmit={form.handleSubmit(submit)} className="space-y-6">
      <MachineField form={form} machines={machines} loading={loading} />

      <TechnicianField form={form} technicians={technicians} />

      <DateFields form={form} />

      <StatusField form={form} />

      <RemarksField form={form} />

      <SubmitButton
        isSubmitting={isSubmitting}
        text="Save PMS Record"
        loadingText="Saving..."
      />
    </form>
  );
};

export default PmsForm;
