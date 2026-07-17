// src/api/dashboard.api.js

import api from "./axios";

/* ============================================================
   DASHBOARD
============================================================ */

// Get Dashboard Data
export const getDashboard = async () => {
  const response = await api.get("/dashboard");
  return response.data;
};
