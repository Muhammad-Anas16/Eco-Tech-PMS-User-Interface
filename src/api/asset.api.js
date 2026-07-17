// src/api/asset.api.js

import api from "./axios";

/* ============================================================
   ASSETS
============================================================ */

// Create Asset
export const createAsset = async (assetData) => {
  const response = await api.post("/assets", assetData);
  return response.data;
};

// Get All Assets
export const getAssets = async () => {
  const response = await api.get("/assets");
  return response.data;
};

// Get Asset By ID
export const getAssetById = async (id) => {
  const response = await api.get(`/assets/${id}`);
  return response.data;
};

// Update Asset
export const updateAsset = async (id, assetData) => {
  const response = await api.put(`/assets/${id}`, assetData);
  return response.data;
};

// Delete Asset
export const deleteAsset = async (id) => {
  const response = await api.delete(`/assets/${id}`);
  return response.data;
};
