import api from "./axios";

export const createPms = async (data) => {
  const response = await api.post("/pms", data);
  return response.data;
};

export const getPmsRecords = async () => {
  const response = await api.get("/pms");
  return response.data;
};

export const getPmsById = async (id) => {
  const response = await api.get(`/pms/${id}`);
  return response.data;
};

export const updatePms = async (id, data) => {
  const response = await api.put(`/pms/${id}`, data);
  return response.data;
};

export const deletePms = async (id) => {
  const response = await api.delete(`/pms/${id}`);
  return response.data;
};
