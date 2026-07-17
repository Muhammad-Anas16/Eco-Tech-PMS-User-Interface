// src/api/operator.api.js

import api from "./axios";

/* ============================================================
   OPERATORS
============================================================ */

// Create Operator
export const createOperator = async (operatorData) => {
  const response = await api.post("/operators", operatorData);
  return response.data;
};

// Get All Operators
export const getOperators = async () => {
  const response = await api.get("/operators");
  return response.data;
};

// Get Operator By ID
export const getOperatorById = async (id) => {
  const response = await api.get(`/operators/${id}`);
  return response.data;
};

// Update Operator
export const updateOperator = async (id, operatorData) => {
  const response = await api.put(`/operators/${id}`, operatorData);
  return response.data;
};

// Delete Operator
export const deleteOperator = async (id) => {
  const response = await api.delete(`/operators/${id}`);
  return response.data;
};
