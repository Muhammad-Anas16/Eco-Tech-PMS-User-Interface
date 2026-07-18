// import { useEffect } from "react";
// import { useForm } from "react-hook-form";

// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
// } from "@/components/ui/dialog";

// import { Button } from "@/components/ui/button";

// const CrudFormDialog = ({
//   open,
//   onOpenChange,

//   title = "Create Record",
//   description = "Fill the form below.",

//   defaultValues = {},

//   loading = false,

//   onSubmit,

//   children,
// }) => {
//   const form = useForm({
//     defaultValues,
//     mode: "onChange",
//   });

//   useEffect(() => {
//     if (open) {
//       form.reset(defaultValues);
//     }
//   }, [open, defaultValues, form]);

//   const handleSubmit = async (values) => {
//     if (!onSubmit) return;

//     await onSubmit(values);
//   };

//   const handleClose = () => {
//     form.reset(defaultValues);
//     onOpenChange?.(false);
//   };

//   return (
//     <Dialog
//       open={open}
//       onOpenChange={(value) => {
//         if (!value) {
//           handleClose();
//         } else {
//           onOpenChange?.(true);
//         }
//       }}
//     >
//       <DialogContent className="sm:max-w-2xl rounded-2xl">
//         <DialogHeader>
//           <DialogTitle className="text-xl font-semibold">{title}</DialogTitle>

//           <DialogDescription>{description}</DialogDescription>
//         </DialogHeader>

//         <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
//           {/*
//             Dynamic Fields
//             Example:

//             <Input />

//             <Textarea />

//             <Select />

//             etc...
//           */}

//           {typeof children === "function" ? children(form) : children}

//           <DialogFooter className="pt-4">
//             <Button
//               type="button"
//               variant="outline"
//               disabled={loading}
//               onClick={handleClose}
//             >
//               Cancel
//             </Button>

//             <Button type="submit" disabled={loading}>
//               {loading ? "Saving..." : "Save"}
//             </Button>
//           </DialogFooter>
//         </form>
//       </DialogContent>
//     </Dialog>
//   );
// };

// export default CrudFormDialog;

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const CrudFormDialog = ({
  open,
  onOpenChange,
  title = "Create Record",
  description = "Fill the form below.",
  children,
}) => {
  return (
    <Dialog
      open={open}
      onOpenChange={(value) => {
        console.log("CrudFormDialog:", value);
        onOpenChange?.(value);
      }}
    >
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>

          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>

        {/* MachineForm already contains its own form */}
        {children}
      </DialogContent>
    </Dialog>
  );
};

export default CrudFormDialog;
