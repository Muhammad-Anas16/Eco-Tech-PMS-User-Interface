import { Input } from "@/components/ui/input";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const PlantField = ({ form }) => {
  return (
    <FormField
      control={form.control}
      name="plant"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Plant</FormLabel>

          <FormControl>
            <Input placeholder="Production Unit" {...field} />
          </FormControl>

          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default PlantField;
