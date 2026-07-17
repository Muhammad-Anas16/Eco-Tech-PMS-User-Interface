// src/api/technician.api.js

import api from "./axios";

/* ============================================================
   TECHNICIANS
============================================================ */

// Create Technician
export const createTechnician = async (technicianData) => {
  const response = await api.post("/technicians", technicianData);
  return response.data;
};

// Get All Technicians
export const getTechnicians = async () => {
  const response = await api.get("/technicians");
  return response.data;
};

// Get Technician By ID
export const getTechnicianById = async (id) => {
  const response = await api.get(`/technicians/${id}`);
  return response.data;
};

// Update Technician
export const updateTechnician = async (id, technicianData) => {
  const response = await api.put(`/technicians/${id}`, technicianData);
  return response.data;
};

// Delete Technician
export const deleteTechnician = async (id) => {
  const response = await api.delete(`/technicians/${id}`);
  return response.data;
};
