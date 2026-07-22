import { Button } from "@/components/ui/button";
import { Loader2, Save } from "lucide-react";

const SubmitButton = ({
  isSubmitting = false,
  text = "Save PMS Record",
  loadingText = "Saving...",
}) => {
  return (
    <Button type="submit" className="w-full" disabled={isSubmitting}>
      {isSubmitting ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          {loadingText}
        </>
      ) : (
        <>
          <Save className="mr-2 h-4 w-4" />
          {text}
        </>
      )}
    </Button>
  );
};

export default SubmitButton;
