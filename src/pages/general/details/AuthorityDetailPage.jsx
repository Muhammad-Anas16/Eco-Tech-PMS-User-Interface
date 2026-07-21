import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { getAuthorityById } from "@/api/authority.api";
import PageCard from "@/components/common/PageCard";
import LoadingSkeleton from "@/components/common/LoadingSkeleton";
import RecordDetailCard from "@/components/common/RecordDetailCard";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { showToast } from "../../../lib/toast";

const AuthorityDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [authority, setAuthority] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAuthority = async () => {
      try {
        const response = await getAuthorityById(id);
        setAuthority(response?.data || null);
      } catch (error) {
        showToast.error(
          error?.response?.data?.message || "Failed to load authority.",
        );
      } finally {
        setIsLoading(false);
      }
    };
    fetchAuthority();
  }, [id]);

  if (isLoading) return <LoadingSkeleton />;
  if (!authority)
    return (
      <PageCard>
        <p className="text-muted-foreground">Authority not found.</p>
      </PageCard>
    );

  return (
    <PageCard>
      <Button
        variant="ghost"
        className="mb-4"
        onClick={() => navigate("/general/authority")}
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Authorities
      </Button>

      <RecordDetailCard
        title={authority.authorityName}
        status={authority.isActive ? "Active" : "Inactive"}
        fields={[{ label: "Description", value: authority.description }]}
      />
    </PageCard>
  );
};

export default AuthorityDetailPage;
