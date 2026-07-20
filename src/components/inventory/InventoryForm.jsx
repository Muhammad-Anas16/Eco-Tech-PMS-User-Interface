// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import {
//   inventorySchema,
//   inventoryDefaultValues,
// } from "@/schema/inventorySchema";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
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

// const STATUS_OPTIONS = ["Available", "Low Stock", "Out of Stock"];

// const InventoryForm = ({ defaultValues, onSubmit, isSubmitting }) => {
//   const form = useForm({
//     resolver: zodResolver(inventorySchema),
//     defaultValues: defaultValues || inventoryDefaultValues,
//   });

//   return (
//     <Form {...form}>
//       <form
//         id="inventory-form"
//         onSubmit={form.handleSubmit(onSubmit)}
//         className="space-y-4"
//       >
//         <div className="grid grid-cols-2 gap-4">
//           <FormField
//             control={form.control}
//             name="itemCode"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Item Code</FormLabel>
//                 <FormControl>
//                   <Input placeholder="e.g. ITM-001" {...field} />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />

//           <FormField
//             control={form.control}
//             name="category"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Category</FormLabel>
//                 <FormControl>
//                   <Input placeholder="e.g. Spare Parts" {...field} />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />
//         </div>

//         <FormField
//           control={form.control}
//           name="itemName"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Item Name</FormLabel>
//               <FormControl>
//                 <Input placeholder="e.g. Bearing 6205" {...field} />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />

//         <div className="grid grid-cols-3 gap-4">
//           <FormField
//             control={form.control}
//             name="unit"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Unit</FormLabel>
//                 <FormControl>
//                   <Input placeholder="e.g. pcs, kg" {...field} />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />

//           <FormField
//             control={form.control}
//             name="quantity"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Quantity</FormLabel>
//                 <FormControl>
//                   <Input type="number" placeholder="0" {...field} />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />

//           <FormField
//             control={form.control}
//             name="minimumStock"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Minimum Stock</FormLabel>
//                 <FormControl>
//                   <Input type="number" placeholder="0" {...field} />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />
//         </div>

//         <div className="grid grid-cols-2 gap-4">
//           <FormField
//             control={form.control}
//             name="location"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Location</FormLabel>
//                 <FormControl>
//                   <Input placeholder="e.g. Store Room A" {...field} />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />

//           <FormField
//             control={form.control}
//             name="supplier"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Supplier</FormLabel>
//                 <FormControl>
//                   <Input placeholder="e.g. ABC Traders" {...field} />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />
//         </div>

//         <div className="grid grid-cols-2 gap-4">
//           <FormField
//             control={form.control}
//             name="unitPrice"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Unit Price</FormLabel>
//                 <FormControl>
//                   <Input
//                     type="number"
//                     step="0.01"
//                     placeholder="0.00"
//                     {...field}
//                   />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />

//           <FormField
//             control={form.control}
//             name="status"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Status</FormLabel>
//                 <Select
//                   onValueChange={field.onChange}
//                   defaultValue={field.value}
//                 >
//                   <FormControl>
//                     <SelectTrigger>
//                       <SelectValue placeholder="Select status" />
//                     </SelectTrigger>
//                   </FormControl>
//                   <SelectContent>
//                     {STATUS_OPTIONS.map((status) => (
//                       <SelectItem key={status} value={status}>
//                         {status}
//                       </SelectItem>
//                     ))}
//                   </SelectContent>
//                 </Select>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />
//         </div>

//         <Button type="submit" className="w-full" disabled={isSubmitting}>
//           {isSubmitting ? "Saving..." : "Save Item"}
//         </Button>
//       </form>
//     </Form>
//   );
// };

// export default InventoryForm;

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  inventorySchema,
  inventoryDefaultValues,
} from "@/schema/inventorySchema";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const STATUS_OPTIONS = ["Available", "Low Stock", "Out of Stock"];

const InventoryForm = ({ defaultValues, onSubmit, isSubmitting }) => {
  const form = useForm({
    resolver: zodResolver(inventorySchema),
    defaultValues: defaultValues || inventoryDefaultValues,
  });

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = form;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="mb-2 block text-sm font-medium">Item Code</label>
          <Input placeholder="e.g. ITM-001" {...register("itemCode")} />
          {errors.itemCode && (
            <p className="mt-1 text-sm text-red-500">
              {errors.itemCode.message}
            </p>
          )}
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">Category</label>
          <Input placeholder="e.g. Spare Parts" {...register("category")} />
          {errors.category && (
            <p className="mt-1 text-sm text-red-500">
              {errors.category.message}
            </p>
          )}
        </div>
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium">Item Name</label>
        <Input placeholder="e.g. Bearing 6205" {...register("itemName")} />
        {errors.itemName && (
          <p className="mt-1 text-sm text-red-500">{errors.itemName.message}</p>
        )}
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div>
          <label className="mb-2 block text-sm font-medium">Unit</label>
          <Input placeholder="e.g. pcs, kg" {...register("unit")} />
          {errors.unit && (
            <p className="mt-1 text-sm text-red-500">{errors.unit.message}</p>
          )}
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">Quantity</label>
          <Input
            type="number"
            placeholder="0"
            {...register("quantity", { valueAsNumber: true })}
          />
          {errors.quantity && (
            <p className="mt-1 text-sm text-red-500">
              {errors.quantity.message}
            </p>
          )}
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">
            Minimum Stock
          </label>
          <Input
            type="number"
            placeholder="0"
            {...register("minimumStock", { valueAsNumber: true })}
          />
          {errors.minimumStock && (
            <p className="mt-1 text-sm text-red-500">
              {errors.minimumStock.message}
            </p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="mb-2 block text-sm font-medium">Location</label>
          <Input placeholder="e.g. Store Room A" {...register("location")} />
          {errors.location && (
            <p className="mt-1 text-sm text-red-500">
              {errors.location.message}
            </p>
          )}
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">Supplier</label>
          <Input placeholder="e.g. ABC Traders" {...register("supplier")} />
          {errors.supplier && (
            <p className="mt-1 text-sm text-red-500">
              {errors.supplier.message}
            </p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="mb-2 block text-sm font-medium">Unit Price</label>
          <Input
            type="number"
            step="0.01"
            placeholder="0.00"
            {...register("unitPrice", { valueAsNumber: true })}
          />
          {errors.unitPrice && (
            <p className="mt-1 text-sm text-red-500">
              {errors.unitPrice.message}
            </p>
          )}
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">Status</label>

          <Controller
            name="status"
            control={control}
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
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
            <p className="mt-1 text-sm text-red-500">{errors.status.message}</p>
          )}
        </div>
      </div>

      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? "Saving..." : "Save Item"}
      </Button>
    </form>
  );
};

export default InventoryForm;
