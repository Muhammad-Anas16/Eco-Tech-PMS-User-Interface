import { useEffect, useState } from "react";
import { getMachines } from "@/api/machine.api";
import { getTechnicians } from "@/api/technician.api";

export const usePmsData = () => {
  const [machines, setMachines] = useState([]);
  const [technicians, setTechnicians] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        const [machineRes, techRes] = await Promise.all([
          getMachines(),
          getTechnicians(),
        ]);

        setMachines(machineRes?.data || []);
        setTechnicians(techRes?.data || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetch();
  }, []);

  return {
    machines,
    technicians,
    loading,
  };
};
