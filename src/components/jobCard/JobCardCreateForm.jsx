// import { useEffect, useState } from "react";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import {
//   jobCardCreateSchema,
//   jobCardCreateDefaultValues,
//   JOB_TYPES,
// } from "@/schema/jobCardSchema";
// import { getMachines } from "@/api/machine.api";
// import { getFaults } from "@/api/fault.api";
// import { getOperators } from "@/api/operator.api";
// import { Button } from "@/components/ui/button";
// import { Textarea } from "@/components/ui/textarea";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";

// const NONE = "none";

// // Sirf CREATE ke liye hai — edit yahan nahi hota, timing/status alag se update hote hain
// const JobCardCreateForm = ({ onSubmit, isSubmitting }) => {
//   const [machines, setMachines] = useState([]);
//   const [faults, setFaults] = useState([]);
//   const [operators, setOperators] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const form = useForm({
//     resolver: zodResolver(jobCardCreateSchema),
//     defaultValues: jobCardCreateDefaultValues,
//   });

//   useEffect(() => {
//     const fetchDropdownData = async () => {
//       try {
//         const [machinesRes, faultsRes, operatorsRes] = await Promise.all([
//           getMachines(),
//           getFaults(),
//           getOperators(),
//         ]);
//         setMachines(machinesRes?.data || []);
//         setFaults(faultsRes?.data || []);
//         setOperators(operatorsRes?.data || []);
//       } catch (error) {
//         console.error("Failed to load dropdown data:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchDropdownData();
//   }, []);

//   const handleFormSubmit = (data) => {
//     onSubmit({
//       machineId: Number(data.machineId),
//       faultId:
//         data.faultId && data.faultId !== NONE ? Number(data.faultId) : null,
//       operatorId:
//         data.operatorId && data.operatorId !== NONE
//           ? Number(data.operatorId)
//           : null,
//       jobType: data.jobType,
//       remarks: data.remarks,
//     });
//   };

//   return (
//     <Form {...form}>
//       <form
//         id="job-card-create-form"
//         onSubmit={form.handleSubmit(handleFormSubmit)}
//         className="space-y-4"
//       >
//         <FormField
//           control={form.control}
//           name="machineId"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Machine</FormLabel>
//               <Select onValueChange={field.onChange} defaultValue={field.value}>
//                 <FormControl>
//                   <SelectTrigger>
//                     <SelectValue
//                       placeholder={loading ? "Loading..." : "Select a machine"}
//                     />
//                   </SelectTrigger>
//                 </FormControl>
//                 <SelectContent>
//                   {machines.map((m) => (
//                     <SelectItem key={m.id} value={String(m.id)}>
//                       {m.machineName} ({m.machineCode})
//                     </SelectItem>
//                   ))}
//                 </SelectContent>
//               </Select>
//               <FormMessage />
//             </FormItem>
//           )}
//         />

//         <div className="grid grid-cols-2 gap-4">
//           <FormField
//             control={form.control}
//             name="faultId"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Fault (optional)</FormLabel>
//                 <Select onValueChange={field.onChange} defaultValue={NONE}>
//                   <FormControl>
//                     <SelectTrigger>
//                       <SelectValue placeholder="Select a fault" />
//                     </SelectTrigger>
//                   </FormControl>
//                   <SelectContent>
//                     <SelectItem value={NONE}>None</SelectItem>
//                     {faults.map((f) => (
//                       <SelectItem key={f.id} value={String(f.id)}>
//                         {f.faultName}
//                       </SelectItem>
//                     ))}
//                   </SelectContent>
//                 </Select>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />

//           <FormField
//             control={form.control}
//             name="operatorId"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Operator (optional)</FormLabel>
//                 <Select onValueChange={field.onChange} defaultValue={NONE}>
//                   <FormControl>
//                     <SelectTrigger>
//                       <SelectValue placeholder="Select an operator" />
//                     </SelectTrigger>
//                   </FormControl>
//                   <SelectContent>
//                     <SelectItem value={NONE}>None</SelectItem>
//                     {operators.map((op) => (
//                       <SelectItem key={op.id} value={String(op.id)}>
//                         {op.operatorName} ({op.operatorCode})
//                       </SelectItem>
//                     ))}
//                   </SelectContent>
//                 </Select>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />
//         </div>

//         <FormField
//           control={form.control}
//           name="jobType"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Job Type</FormLabel>
//               <Select onValueChange={field.onChange} defaultValue={field.value}>
//                 <FormControl>
//                   <SelectTrigger>
//                     <SelectValue placeholder="Select job type" />
//                   </SelectTrigger>
//                 </FormControl>
//                 <SelectContent>
//                   {JOB_TYPES.map((type) => (
//                     <SelectItem key={type} value={type}>
//                       {type}
//                     </SelectItem>
//                   ))}
//                 </SelectContent>
//               </Select>
//               <FormMessage />
//             </FormItem>
//           )}
//         />

//         <FormField
//           control={form.control}
//           name="remarks"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Remarks</FormLabel>
//               <FormControl>
//                 <Textarea placeholder="Optional notes" {...field} />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />

//         <Button type="submit" className="w-full" disabled={isSubmitting}>
//           {isSubmitting ? "Creating..." : "Create Job Card"}
//         </Button>
//       </form>
//     </Form>
//   );
// };

// export default JobCardCreateForm;

import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  jobCardCreateSchema,
  jobCardCreateDefaultValues,
  JOB_TYPES,
} from "@/schema/jobCardSchema";

import { getMachines } from "@/api/machine.api";
import { getFaults } from "@/api/fault.api";
import { getOperators } from "@/api/operator.api";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const NONE = "none";

const JobCardCreateForm = ({ onSubmit, isSubmitting }) => {
  const [machines, setMachines] = useState([]);
  const [faults, setFaults] = useState([]);
  const [operators, setOperators] = useState([]);
  const [loading, setLoading] = useState(true);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(jobCardCreateSchema),
    defaultValues: jobCardCreateDefaultValues,
  });

  useEffect(() => {
    const fetchDropdownData = async () => {
      try {
        const [machinesRes, faultsRes, operatorsRes] = await Promise.all([
          getMachines(),
          getFaults(),
          getOperators(),
        ]);

        setMachines(machinesRes?.data || []);
        setFaults(faultsRes?.data || []);
        setOperators(operatorsRes?.data || []);
      } catch (error) {
        console.error("Failed to load dropdown data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDropdownData();
  }, []);

  const submitHandler = (data) => {
    onSubmit({
      machineId: Number(data.machineId),
      faultId:
        data.faultId && data.faultId !== NONE ? Number(data.faultId) : null,
      operatorId:
        data.operatorId && data.operatorId !== NONE
          ? Number(data.operatorId)
          : null,
      jobType: data.jobType,
      remarks: data.remarks,
    });
  };

  return (
    <form onSubmit={handleSubmit(submitHandler)} className="space-y-6">
      {/* Machine */}
      <div>
        <label className="mb-2 block text-sm font-medium">Machine</label>

        <Controller
          control={control}
          name="machineId"
          render={({ field }) => (
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger>
                <SelectValue
                  placeholder={
                    loading ? "Loading machines..." : "Select Machine"
                  }
                />
              </SelectTrigger>

              <SelectContent>
                {machines.map((m) => (
                  <SelectItem key={m.id} value={String(m.id)}>
                    {m.machineName} ({m.machineCode})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />

        {errors.machineId && (
          <p className="mt-1 text-sm text-red-500">
            {errors.machineId.message}
          </p>
        )}
      </div>

      {/* Fault + Operator */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="mb-2 block text-sm font-medium">
            Fault (optional)
          </label>

          <Controller
            control={control}
            name="faultId"
            render={({ field }) => (
              <Select
                value={field.value || NONE}
                onValueChange={field.onChange}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Fault" />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value={NONE}>None</SelectItem>

                  {faults.map((fault) => (
                    <SelectItem key={fault.id} value={String(fault.id)}>
                      {fault.faultName}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />

          {errors.faultId && (
            <p className="mt-1 text-sm text-red-500">
              {errors.faultId.message}
            </p>
          )}
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">
            Operator (optional)
          </label>

          <Controller
            control={control}
            name="operatorId"
            render={({ field }) => (
              <Select
                value={field.value || NONE}
                onValueChange={field.onChange}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Operator" />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value={NONE}>None</SelectItem>

                  {operators.map((op) => (
                    <SelectItem key={op.id} value={String(op.id)}>
                      {op.operatorName} ({op.operatorCode})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />

          {errors.operatorId && (
            <p className="mt-1 text-sm text-red-500">
              {errors.operatorId.message}
            </p>
          )}
        </div>
      </div>

      {/* Job Type */}
      <div>
        <label className="mb-2 block text-sm font-medium">Job Type</label>

        <Controller
          control={control}
          name="jobType"
          render={({ field }) => (
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select Job Type" />
              </SelectTrigger>

              <SelectContent>
                {JOB_TYPES.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />

        {errors.jobType && (
          <p className="mt-1 text-sm text-red-500">{errors.jobType.message}</p>
        )}
      </div>

      {/* Remarks */}
      <div>
        <label className="mb-2 block text-sm font-medium">Remarks</label>

        <Controller
          control={control}
          name="remarks"
          render={({ field }) => (
            <Textarea placeholder="Optional notes..." {...field} />
          )}
        />

        {errors.remarks && (
          <p className="mt-1 text-sm text-red-500">{errors.remarks.message}</p>
        )}
      </div>

      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? "Creating..." : "Create Job Card"}
      </Button>
    </form>
  );
};

export default JobCardCreateForm;
