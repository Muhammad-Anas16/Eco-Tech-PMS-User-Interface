import { useEffect, useState } from "react";
import { getMachines } from "@/api/machine.api";

export const useMachines = () => {
  const [machines, setMachines] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMachines = async () => {
      try {
        const response = await getMachines();
        setMachines(response?.data || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMachines();
  }, []);

  return {
    machines,
    loading,
  };
};
