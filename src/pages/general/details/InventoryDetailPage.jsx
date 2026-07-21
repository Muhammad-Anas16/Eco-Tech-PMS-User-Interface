import api from "@/api/axios";
import { ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { showToast } from "../../../lib/toast";
import { Button } from "@/components/ui/button";
import PageCard from "@/components/common/PageCard";
import { useParams, useNavigate } from "react-router";
import LoadingSkeleton from "@/components/common/LoadingSkeleton";
import RecordDetailCard from "@/components/common/RecordDetailCard";

const InventoryDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const response = await api.get(`/inventory/${id}`);
        setItem(response.data?.data || null);
      } catch (error) {
        showToast.error(
          error?.response?.data?.message || "Failed to load item.",
        );
      } finally {
        setIsLoading(false);
      }
    };
    fetchItem();
  }, [id]);

  if (isLoading) return <LoadingSkeleton />;
  if (!item)
    return (
      <PageCard>
        <p className="text-muted-foreground">Item not found.</p>
      </PageCard>
    );

  return (
    <PageCard>
      <Button
        variant="ghost"
        className="mb-4"
        onClick={() => navigate("/general/inventory")}
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Inventory
      </Button>

      <RecordDetailCard
        title={item.itemName}
        subtitle={item.itemCode}
        status={item.status}
        fields={[
          { label: "Category", value: item.category },
          { label: "Quantity", value: `${item.quantity} ${item.unit || ""}` },
          { label: "Minimum Stock", value: item.minimumStock },
          { label: "Location", value: item.location },
          { label: "Supplier", value: item.supplier },
          {
            label: "Unit Price",
            value: `Rs. ${Number(item.unitPrice || 0).toFixed(2)}`,
          },
        ]}
      />
    </PageCard>
  );
};

export default InventoryDetailPage;
