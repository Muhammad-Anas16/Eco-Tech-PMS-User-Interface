import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { assetSchema, assetDefaultValues } from "@/schema/assetSchema";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const STATUS_OPTIONS = ["Active", "Inactive"];

const AssetForm = ({ defaultValues, onSubmit, isSubmitting }) => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(assetSchema),
    defaultValues: defaultValues || assetDefaultValues,
  });

  return (
    <form
      id="asset-form"
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-5"
    >
      {/* Asset Code + Category */}
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <label className="text-sm font-medium">Asset Code</label>

          <Input placeholder="e.g. A-001" {...register("assetCode")} />

          {errors.assetCode && (
            <p className="text-sm text-destructive">
              {errors.assetCode.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Category</label>

          <Input placeholder="e.g. Instrument" {...register("category")} />

          {errors.category && (
            <p className="text-sm text-destructive">
              {errors.category.message}
            </p>
          )}
        </div>
      </div>

      {/* Asset Name */}
      <div className="space-y-2">
        <label className="text-sm font-medium">Asset Name</label>

        <Input placeholder="e.g. Weighing Scale" {...register("assetName")} />

        {errors.assetName && (
          <p className="text-sm text-destructive">{errors.assetName.message}</p>
        )}
      </div>

      {/* Location + Manufacturer */}
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <label className="text-sm font-medium">Location</label>

          <Input placeholder="e.g. Store Room" {...register("location")} />

          {errors.location && (
            <p className="text-sm text-destructive">
              {errors.location.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Manufacturer</label>

          <Input placeholder="e.g. Avery" {...register("manufacturer")} />

          {errors.manufacturer && (
            <p className="text-sm text-destructive">
              {errors.manufacturer.message}
            </p>
          )}
        </div>
      </div>

      {/* Serial Number */}
      <div className="space-y-2">
        <label className="text-sm font-medium">Serial Number</label>

        <Input placeholder="e.g. SN-12345" {...register("serialNumber")} />

        {errors.serialNumber && (
          <p className="text-sm text-destructive">
            {errors.serialNumber.message}
          </p>
        )}
      </div>

      {/* Status */}
      <div className="space-y-2">
        <label className="text-sm font-medium">Status</label>

        <Controller
          control={control}
          name="status"
          render={({ field }) => (
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select Status" />
              </SelectTrigger>

              <SelectContent>
                {STATUS_OPTIONS.map((status) => (
                  <SelectItem key={status} value={status}>
                    {status}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />

        {errors.status && (
          <p className="text-sm text-destructive">{errors.status.message}</p>
        )}
      </div>

      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? "Saving..." : "Save Asset"}
      </Button>
    </form>
  );
};

export default AssetForm;
