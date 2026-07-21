import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { getMachineById } from "@/api/machine.api";
import { getMachineLocationsByMachine } from "@/api/machineLocation.api";

import PageCard from "@/components/common/PageCard";
import LoadingSkeleton from "@/components/common/LoadingSkeleton";
import EmptyState from "@/components/common/EmptyState";
import StatusBadge from "@/components/common/StatusBadge";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft } from "lucide-react";
import { showToast } from "../../../lib/toast";

const MachineDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [machine, setMachine] = useState(null);
  const [locations, setLocations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingLocations, setIsLoadingLocations] = useState(true);

  useEffect(() => {
    const fetchMachine = async () => {
      setIsLoading(true);
      try {
        const response = await getMachineById(id);
        setMachine(response?.data || null);
      } catch (error) {
        showToast.error(
          error?.response?.data?.message || "Failed to load machine.",
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchMachine();
  }, [id]);

  useEffect(() => {
    const fetchLocations = async () => {
      setIsLoadingLocations(true);
      try {
        const response = await getMachineLocationsByMachine(id);
        setLocations(response?.data || []);
      } catch (error) {
        showToast.error(
          error?.response?.data?.message || "Failed to load locations.",
        );
      } finally {
        setIsLoadingLocations(false);
      }
    };

    fetchLocations();
  }, [id]);

  if (isLoading) return <LoadingSkeleton />;

  if (!machine) {
    return (
      <PageCard>
        <p className="text-muted-foreground">Machine not found.</p>
      </PageCard>
    );
  }

  return (
    <PageCard>
      <Button
        variant="ghost"
        className="mb-4"
        onClick={() => navigate("/general/machine")}
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Machines
      </Button>

      <Card className="rounded-xl shadow-sm mb-6">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>{machine.machineName}</CardTitle>
            <StatusBadge status={machine.status} />
          </div>
        </CardHeader>
        <CardContent className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
          <div>
            <p className="text-muted-foreground">Code</p>
            <p className="font-medium">{machine.machineCode}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Plant</p>
            <p className="font-medium">{machine.plant || "-"}</p>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="location">
        <TabsList className="flex-wrap h-auto">
          <TabsTrigger value="location">Location</TabsTrigger>
          <TabsTrigger value="machine-checks">Machine Checks</TabsTrigger>
          <TabsTrigger value="machine-pms">Machine PMS</TabsTrigger>
          <TabsTrigger value="calibration">Calibration Master List</TabsTrigger>
        </TabsList>

        {/* Location — REAL data, existing API use ho raha hai */}
        <TabsContent value="location" className="pt-4">
          {isLoadingLocations ? (
            <LoadingSkeleton />
          ) : locations.length === 0 ? (
            <EmptyState
              title="No records found"
              description="This is a list of machine location."
            />
          ) : (
            <div className="rounded-xl border overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-muted">
                  <tr>
                    <th className="text-left p-3">Location</th>
                    <th className="text-left p-3">Location Name</th>
                  </tr>
                </thead>
                <tbody>
                  {locations.map((loc) => (
                    <tr key={loc.id} className="border-t">
                      <td className="p-3">{loc.locationCode || "-"}</td>
                      <td className="p-3">{loc.locationName}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </TabsContent>

        {/* Ye 3 tabs abhi backend me nahi bane — honest stub */}
        <TabsContent value="machine-checks" className="pt-4">
          <EmptyState
            title="Not available yet"
            description="Machine Checks module hasn't been built on the backend yet."
          />
        </TabsContent>

        <TabsContent value="machine-pms" className="pt-4">
          <EmptyState
            title="Not available yet"
            description="Machine PMS module hasn't been built on the backend yet."
          />
        </TabsContent>

        <TabsContent value="calibration" className="pt-4">
          <EmptyState
            title="Not available yet"
            description="Calibration module hasn't been built on the backend yet."
          />
        </TabsContent>
      </Tabs>
    </PageCard>
  );
};

export default MachineDetailPage;
