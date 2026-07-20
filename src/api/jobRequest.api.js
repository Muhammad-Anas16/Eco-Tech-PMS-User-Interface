import api from "./axios";

export const createJobRequest = async (data) => {
  const response = await api.post("/job-requests", data);
  return response.data;
};

export const getJobRequests = async () => {
  const response = await api.get("/job-requests");
  return response.data;
};

export const getJobRequestById = async (id) => {
  const response = await api.get(`/job-requests/${id}`);
  return response.data;
};

export const updateJobRequest = async (id, data) => {
  const response = await api.put(`/job-requests/${id}`, data);
  return response.data;
};

export const updateJobRequestStatus = async (id, status) => {
  const response = await api.patch(`/job-requests/${id}/status`, { status });
  return response.data;
};

export const deleteJobRequest = async (id) => {
  const response = await api.delete(`/job-requests/${id}`);
  return response.data;
};
