import { Controller } from "react-hook-form";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const MachineField = ({ form, machines = [], loading = false }) => {
  return (
    <div className="space-y-2">
      <label htmlFor="machineId" className="text-sm font-medium">
        Machine
      </label>

      <Controller
        control={form.control}
        name="machineId"
        render={({ field }) => (
          <Select value={field.value} onValueChange={field.onChange}>
            <SelectTrigger id="machineId">
              <SelectValue
                placeholder={loading ? "Loading machines..." : "Select Machine"}
              />
            </SelectTrigger>

            <SelectContent>
              {machines.length > 0 ? (
                machines.map((machine) => (
                  <SelectItem
                    key={machine.machineId}
                    value={String(machine.machineId)}
                  >
                    {machine.machineName} ({machine.machineCode})
                  </SelectItem>
                ))
              ) : (
                <SelectItem value="no-machine" disabled>
                  No Machines Found
                </SelectItem>
              )}
            </SelectContent>
          </Select>
        )}
      />

      {form.formState.errors.machineId && (
        <p className="text-sm text-destructive">
          {form.formState.errors.machineId.message}
        </p>
      )}
    </div>
  );
};

export default MachineField;
