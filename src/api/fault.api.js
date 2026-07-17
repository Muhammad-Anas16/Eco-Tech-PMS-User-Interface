// src/api/fault.api.js

import api from "./axios";

/* ============================================================
   FAULTS
============================================================ */

// Create Fault
export const createFault = async (faultData) => {
  const response = await api.post("/faults", faultData);
  return response.data;
};

// Get All Faults
export const getFaults = async () => {
  const response = await api.get("/faults");
  return response.data;
};

// Get Active Faults
export const getActiveFaults = async () => {
  const response = await api.get("/faults/active");
  return response.data;
};

// Get Fault By ID
export const getFaultById = async (id) => {
  const response = await api.get(`/faults/${id}`);
  return response.data;
};

// Update Fault
export const updateFault = async (id, faultData) => {
  const response = await api.put(`/faults/${id}`, faultData);
  return response.data;
};

// Delete Fault
export const deleteFault = async (id) => {
  const response = await api.delete(`/faults/${id}`);
  return response.data;
};
