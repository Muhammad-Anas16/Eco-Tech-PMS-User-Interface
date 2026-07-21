import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { getAssetById } from "@/api/asset.api";
import PageCard from "@/components/common/PageCard";
import LoadingSkeleton from "@/components/common/LoadingSkeleton";
import RecordDetailCard from "@/components/common/RecordDetailCard";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { showToast } from "../../../lib/toast";

const AssetDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [asset, setAsset] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAsset = async () => {
      try {
        const response = await getAssetById(id);
        setAsset(response?.data || null);
      } catch (error) {
        showToast.error(
          error?.response?.data?.message || "Failed to load asset.",
        );
      } finally {
        setIsLoading(false);
      }
    };
    fetchAsset();
  }, [id]);

  if (isLoading) return <LoadingSkeleton />;
  if (!asset)
    return (
      <PageCard>
        <p className="text-muted-foreground">Asset not found.</p>
      </PageCard>
    );

  return (
    <PageCard>
      <Button
        variant="ghost"
        className="mb-4"
        onClick={() => navigate("/general/asset")}
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Assets
      </Button>

      <RecordDetailCard
        title={asset.assetName}
        subtitle={asset.assetCode}
        status={asset.status}
        fields={[
          { label: "Category", value: asset.category },
          { label: "Location", value: asset.location },
          { label: "Manufacturer", value: asset.manufacturer },
          { label: "Serial Number", value: asset.serialNumber },
        ]}
      />
    </PageCard>
  );
};

export default AssetDetailPage;
