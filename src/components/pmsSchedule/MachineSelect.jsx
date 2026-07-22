import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

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
  machines,
  loading,
  required = false,
}) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>

          <Select
            onValueChange={field.onChange}
            defaultValue={field.value || NONE}
          >
            <FormControl>
              <SelectTrigger>
                <SelectValue
                  placeholder={
                    loading ? "Loading machines..." : "Select machine"
                  }
                />
              </SelectTrigger>
            </FormControl>

            <SelectContent>
              {!required && <SelectItem value={NONE}>None</SelectItem>}

              {machines.map((m) => (
                <SelectItem key={m.machineId} value={String(m.machineId)}>
                  {m.machineName} ({m.machineCode})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default MachineSelect;
