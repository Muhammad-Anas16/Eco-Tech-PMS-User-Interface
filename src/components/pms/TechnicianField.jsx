import { Controller } from "react-hook-form";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const TechnicianField = ({ form, technicians = [] }) => {
  return (
    <div className="space-y-2">
      <label htmlFor="assignedTechnicianId" className="text-sm font-medium">
        Assigned Technician (Optional)
      </label>

      <Controller
        control={form.control}
        name="assignedTechnicianId"
        render={({ field }) => (
          <Select value={field.value || "none"} onValueChange={field.onChange}>
            <SelectTrigger id="assignedTechnicianId">
              <SelectValue placeholder="Select Technician" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="none">None</SelectItem>

              {technicians.length > 0 ? (
                technicians.map((tech) => (
                  <SelectItem key={tech.techId} value={String(tech.techId)}>
                    {tech.techName} ({tech.techCode})
                  </SelectItem>
                ))
              ) : (
                <SelectItem value="no-technician" disabled>
                  No Technicians Found
                </SelectItem>
              )}
            </SelectContent>
          </Select>
        )}
      />

      {form.formState.errors.assignedTechnicianId && (
        <p className="text-sm text-destructive">
          {form.formState.errors.assignedTechnicianId.message}
        </p>
      )}
    </div>
  );
};

export default TechnicianField;
