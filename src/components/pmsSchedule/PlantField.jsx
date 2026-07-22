import { Controller } from "react-hook-form";

import { Input } from "@/components/ui/input";

const PlantField = ({ form }) => {
  return (
    <div className="space-y-2">
      <label htmlFor="plant" className="text-sm font-medium">
        Plant
      </label>

      <Controller
        control={form.control}
        name="plant"
        render={({ field }) => (
          <Input id="plant" placeholder="Production Unit" {...field} />
        )}
      />

      {form.formState.errors.plant && (
        <p className="text-sm text-red-500">
          {form.formState.errors.plant.message}
        </p>
      )}
    </div>
  );
};

export default PlantField;
