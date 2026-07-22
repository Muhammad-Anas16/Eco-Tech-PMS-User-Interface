import { Switch } from "@/components/ui/switch";

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";

const ActiveSwitch = ({ form }) => {
  return (
    <FormField
      control={form.control}
      name="isActive"
      render={({ field }) => (
        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
          <div>
            <FormLabel>Active</FormLabel>

            <FormDescription>
              Inactive schedules won't generate new PMS jobs.
            </FormDescription>
          </div>

          <FormControl>
            <Switch checked={field.value} onCheckedChange={field.onChange} />
          </FormControl>
        </FormItem>
      )}
    />
  );
};

export default ActiveSwitch;
