import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  jobCardItemSchema,
  jobCardItemDefaultValues,
} from "@/schema/jobCardSchema";
import {
  getJobCardItems,
  addJobCardItem,
  deleteJobCardItem,
} from "@/api/jobCard.api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Trash2 } from "lucide-react";
import { showToast } from "@/lib/showToast";
import LoadingSkeleton from "@/components/common/LoadingSkeleton";

// jobCardId: parent (JobCardDetailPage) se aata hai
const JobCardItems = ({ jobCardId }) => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm({
    resolver: zodResolver(jobCardItemSchema),
    defaultValues: jobCardItemDefaultValues,
  });

  const fetchItems = async () => {
    setIsLoading(true);
    try {
      const response = await getJobCardItems(jobCardId);
      setItems(response?.data || []);
    } catch (error) {
      showToast.error(
        error?.response?.data?.message || "Failed to load items.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, [jobCardId]);

  const handleAddItem = async (data) => {
    setIsSubmitting(true);
    try {
      await addJobCardItem(jobCardId, data);
      showToast.success("Item issued successfully.");
      form.reset(jobCardItemDefaultValues);
      fetchItems();
    } catch (error) {
      showToast.error(
        error?.response?.data?.message || "Failed to issue item.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteItem = async (itemId) => {
    try {
      await deleteJobCardItem(itemId);
      showToast.success("Item entry removed.");
      fetchItems();
    } catch (error) {
      showToast.error(
        error?.response?.data?.message || "Failed to remove item entry.",
      );
    }
  };

  return (
    <div className="space-y-4">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleAddItem)}
          className="grid grid-cols-2 md:grid-cols-5 gap-3 items-end"
        >
          <FormField
            control={form.control}
            name="itemCode"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Item Code</FormLabel>
                <FormControl>
                  <Input placeholder="ITM-001" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="itemName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Item Name</FormLabel>
                <FormControl>
                  <Input placeholder="Bearing" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="quantityIssued"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Qty</FormLabel>
                <FormControl>
                  <Input type="number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="rate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Rate</FormLabel>
                <FormControl>
                  <Input type="number" step="0.01" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Adding..." : "Add Item"}
          </Button>
        </form>
      </Form>

      {isLoading ? (
        <LoadingSkeleton />
      ) : items.length === 0 ? (
        <p className="text-sm text-muted-foreground">No items issued yet.</p>
      ) : (
        <div className="border rounded-lg overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-muted">
              <tr>
                <th className="text-left p-2">Code</th>
                <th className="text-left p-2">Name</th>
                <th className="text-left p-2">Qty</th>
                <th className="text-left p-2">Rate</th>
                <th className="text-left p-2">Amount</th>
                <th className="text-left p-2"></th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id} className="border-t">
                  <td className="p-2">{item.itemCode}</td>
                  <td className="p-2">{item.itemName}</td>
                  <td className="p-2">{item.quantityIssued}</td>
                  <td className="p-2">{item.rate}</td>
                  <td className="p-2">{item.amount}</td>
                  <td className="p-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDeleteItem(item.id)}
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default JobCardItems;
