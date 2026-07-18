import { Database, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

const EmptyState = ({
  icon: Icon = Database,
  title = "No Data Found",
  description = "There are no records available at the moment.",
  buttonText = "Add New",
  onAdd,
  showButton = true,
  children,
}) => {
  return (
    <div className="flex min-h-[350px] flex-col items-center justify-center rounded-2xl border border-dashed bg-muted/20 px-6 text-center">
      {/* Icon */}
      <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
        <Icon className="h-10 w-10 text-primary" />
      </div>

      {/* Title */}
      <h3 className="text-xl font-semibold">{title}</h3>

      {/* Description */}
      <p className="mt-2 max-w-md text-sm text-muted-foreground">
        {description}
      </p>

      {/* Custom Content */}
      {children}

      {/* Button */}
      {showButton && (
        <Button onClick={onAdd} className="mt-6">
          <Plus className="mr-2 h-4 w-4" />
          {buttonText}
        </Button>
      )}
    </div>
  );
};

export default EmptyState;
