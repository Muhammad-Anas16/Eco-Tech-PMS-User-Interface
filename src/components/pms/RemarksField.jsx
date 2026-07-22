import { Controller } from "react-hook-form";

import { Textarea } from "@/components/ui/textarea";

const RemarksField = ({ form }) => {
  return (
    <div className="space-y-2">
      <label htmlFor="remarks" className="text-sm font-medium">
        Remarks
      </label>

      <Controller
        control={form.control}
        name="remarks"
        render={({ field }) => (
          <Textarea
            id="remarks"
            rows={4}
            placeholder="Enter remarks (optional)..."
            className="resize-none"
            {...field}
          />
        )}
      />

      {form.formState.errors.remarks && (
        <p className="text-sm text-destructive">
          {form.formState.errors.remarks.message}
        </p>
      )}
    </div>
  );
};

export default RemarksField;
