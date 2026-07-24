// import api from "./axios";

// export const createPmsSchedule = async (data) => {
//   const response = await api.post("/pms-schedules", data);
//   return response.data;
// };

// export const getPmsSchedules = async () => {
//   const response = await api.get("/pms-schedules");
//   return response.data;
// };

// export const getPmsScheduleById = async (id) => {
//   const response = await api.get(`/pms-schedules/${id}`);
//   return response.data;
// };

// export const updatePmsSchedule = async (id, data) => {
//   const response = await api.put(`/pms-schedules/${id}`, data);
//   return response.data;
// };

// export const deletePmsSchedule = async (id) => {
//   const response = await api.delete(`/pms-schedules/${id}`);
//   return response.data;
// };

import api from "./axios";

export const createPmsSchedule = async (data) => {
  const response = await api.post("/pms-schedules", data);
  return response.data;
};

export const getPmsSchedules = async () => {
  const response = await api.get("/pms-schedules");
  return response.data;
};

export const getPmsScheduleById = async (id) => {
  const response = await api.get(`/pms-schedules/${id}`);
  return response.data;
};

export const updatePmsSchedule = async (id, data) => {
  const response = await api.put(`/pms-schedules/${id}`, data);
  return response.data;
};

export const deletePmsSchedule = async (id) => {
  const response = await api.delete(`/pms-schedules/${id}`);
  return response.data;
};
