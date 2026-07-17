// src/api/inventory.api.js

import api from "./axios";

/* ============================================================
   INVENTORY
============================================================ */

// Create Inventory
export const createInventory = async (inventoryData) => {
  const response = await api.post("/inventory", inventoryData);
  return response.data;
};

// Get All Inventory
export const getInventory = async () => {
  const response = await api.get("/inventory");
  return response.data;
};

// Update Inventory
export const updateInventory = async (inventoryData) => {
  const response = await api.put("/inventory", inventoryData);
  return response.data;
};

// Delete Inventory
export const deleteInventory = async () => {
  const response = await api.delete("/inventory");
  return response.data;
};
