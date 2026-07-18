import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  authoritySchema,
  authorityDefaultValues,
} from "@/schema/authoritySchema";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";

const AuthorityForm = ({ defaultValues, onSubmit, isSubmitting }) => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(authoritySchema),
    defaultValues: defaultValues
      ? {
          ...defaultValues,
          isActive: Boolean(defaultValues.isActive),
        }
      : authorityDefaultValues,
  });

  return (
    <form
      id="authority-form"
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-5"
    >
      {/* Authority Name */}
      <div className="space-y-2">
        <label className="text-sm font-medium">Authority Name</label>

        <Input
          placeholder="e.g. Maintenance Manager"
          {...register("authorityName")}
        />

        {errors.authorityName && (
          <p className="text-sm text-destructive">
            {errors.authorityName.message}
          </p>
        )}
      </div>

      {/* Description */}
      <div className="space-y-2">
        <label className="text-sm font-medium">Description</label>

        <Textarea
          placeholder="Optional notes about this authority"
          rows={4}
          {...register("description")}
        />

        {errors.description && (
          <p className="text-sm text-destructive">
            {errors.description.message}
          </p>
        )}
      </div>

      {/* Active Switch */}
      <div className="flex items-center justify-between rounded-xl border p-4">
        <div>
          <h4 className="font-medium">Active</h4>

          <p className="text-sm text-muted-foreground">
            Inactive authorities won't appear in dropdowns.
          </p>
        </div>

        <Controller
          control={control}
          name="isActive"
          render={({ field }) => (
            <Switch checked={field.value} onCheckedChange={field.onChange} />
          )}
        />
      </div>

      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? "Saving..." : "Save Authority"}
      </Button>
    </form>
  );
};

export default AuthorityForm;
