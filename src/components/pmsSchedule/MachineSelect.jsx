import { Controller } from "react-hook-form";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const NONE = "none";

const MachineSelect = ({
  form,
  name,
  label,
  machines = [],
  loading = false,
  required = false,
}) => {
  return (
    <div className="space-y-2">
      <label htmlFor={name} className="text-sm font-medium">
        {label}
      </label>

      <Controller
        control={form.control}
        name={name}
        render={({ field }) => (
          <Select value={field.value || NONE} onValueChange={field.onChange}>
            <SelectTrigger id={name}>
              <SelectValue
                placeholder={loading ? "Loading machines..." : "Select Machine"}
              />
            </SelectTrigger>

            <SelectContent>
              {!required && <SelectItem value={NONE}>None</SelectItem>}

              {machines.map((machine) => (
                <SelectItem
                  key={machine.machineId}
                  value={String(machine.machineId)}
                >
                  {machine.machineName} ({machine.machineCode})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      />

      {form.formState.errors[name] && (
        <p className="text-sm text-red-500">
          {form.formState.errors[name]?.message}
        </p>
      )}
    </div>
  );
};

export default MachineSelect;
