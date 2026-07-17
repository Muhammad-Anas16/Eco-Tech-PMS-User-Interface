import api from "./axios";

/* ============================================================
   MACHINES
============================================================ */

// Create Machine
export const createMachine = async (machineData) => {
  const response = await api.post("/machines", machineData);
  return response.data;
};

// Get All Machines
export const getMachines = async () => {
  const response = await api.get("/machines");
  return response.data;
};

// Get Machine By ID
export const getMachineById = async (id) => {
  const response = await api.get(`/machines/${id}`);
  return response.data;
};

// Update Machine
export const updateMachine = async (id, machineData) => {
  const response = await api.put(`/machines/${id}`, machineData);
  return response.data;
};

// Delete Machine
export const deleteMachine = async (id) => {
  const response = await api.delete(`/machines/${id}`);
  return response.data;
};
