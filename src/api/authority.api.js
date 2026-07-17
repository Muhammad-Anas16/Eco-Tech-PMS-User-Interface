// src/api/authority.api.js

import api from "./axios";

/* ============================================================
   AUTHORITIES
============================================================ */

// Create Authority
export const createAuthority = async (authorityData) => {
  const response = await api.post("/authorities", authorityData);
  return response.data;
};

// Get All Authorities
export const getAuthorities = async () => {
  const response = await api.get("/authorities");
  return response.data;
};

// Get Authority By ID
export const getAuthorityById = async (id) => {
  const response = await api.get(`/authorities/${id}`);
  return response.data;
};

// Update Authority
export const updateAuthority = async (id, authorityData) => {
  const response = await api.put(`/authorities/${id}`, authorityData);
  return response.data;
};

// Delete Authority
export const deleteAuthority = async (id) => {
  const response = await api.delete(`/authorities/${id}`);
  return response.data;
};
