import api from "./axios";

//    JOB CARDS

export const createJobCard = async (data) => {
  const response = await api.post("/job-cards", data);
  return response.data;
};

export const getJobCards = async () => {
  const response = await api.get("/job-cards");
  return response.data;
};

export const getJobCardById = async (id) => {
  const response = await api.get(`/job-cards/${id}`);
  return response.data;
};

export const deleteJobCard = async (id) => {
  const response = await api.delete(`/job-cards/${id}`);
  return response.data;
};

export const updateJobCardTiming = async (id, data) => {
  const response = await api.put(`/job-cards/${id}/timing`, data);
  return response.data;
};

export const updateJobCardStatus = async (id, status) => {
  const response = await api.patch(`/job-cards/${id}/status`, { status });
  return response.data;
};

//    JOB CARD — TECHNICIANS

export const assignTechnicianToJobCard = async (jobCardId, technicianId) => {
  const response = await api.post(`/job-cards/${jobCardId}/technicians`, {
    technicianId,
  });
  return response.data;
};

export const getJobCardTechnicians = async (jobCardId) => {
  const response = await api.get(`/job-cards/${jobCardId}/technicians`);
  return response.data;
};

export const removeJobCardTechnician = async (assignmentId) => {
  const response = await api.delete(`/job-card-technicians/${assignmentId}`);
  return response.data;
};

//    JOB CARD — ITEMS

export const addJobCardItem = async (jobCardId, data) => {
  const response = await api.post(`/job-cards/${jobCardId}/items`, data);
  return response.data;
};

export const getJobCardItems = async (jobCardId) => {
  const response = await api.get(`/job-cards/${jobCardId}/items`);
  return response.data;
};

export const deleteJobCardItem = async (itemId) => {
  const response = await api.delete(`/job-card-items/${itemId}`);
  return response.data;
};
