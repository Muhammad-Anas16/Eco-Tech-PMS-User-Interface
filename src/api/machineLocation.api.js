import api from "./axios";

/* ============================================================
   MACHINE LOCATIONS
============================================================ */

// Create Machine Location
export const createMachineLocation = async (locationData) => {
  const response = await api.post("/machine-locations", locationData);
  return response.data;
};

// Get All Machine Locations
export const getMachineLocations = async () => {
  const response = await api.get("/machine-locations");
  return response.data;
};

// Get Machine Location By ID
export const getMachineLocationById = async (id) => {
  const response = await api.get(`/machine-locations/${id}`);
  return response.data;
};

// Get Locations By Machine ID
export const getMachineLocationsByMachine = async (machineId) => {
  const response = await api.get(`/machine-locations/machine/${machineId}`);
  return response.data;
};

// Update Machine Location
export const updateMachineLocation = async (id, locationData) => {
  const response = await api.put(`/machine-locations/${id}`, locationData);
  return response.data;
};

// Delete Machine Location
export const deleteMachineLocation = async (id) => {
  const response = await api.delete(`/machine-locations/${id}`);
  return response.data;
};
