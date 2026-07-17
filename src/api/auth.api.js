import api from "./axios";

/* ============================================================
   AUTH
============================================================ */

// Register User
export const register = async (userData) => {
  const response = await api.post("/register", userData);
  return response.data;
};

// Login
export const login = async (loginData) => {
  const response = await api.post("/login", loginData);

  // Token save karo, login ke turant baad
  if (response.data?.data?.token) {
    localStorage.setItem("token", response.data.data.token);
  }

  return response.data;
};

// Logout
export const logout = async () => {
  const response = await api.post("/logout");

  // Frontend se token remove karo
  localStorage.removeItem("token");

  return response.data;
};

// Logged In User
export const getMe = async () => {
  const response = await api.get("/me");
  return response.data;
};

/* ============================================================
   USERS
============================================================ */

// Get All Users
export const getUsers = async () => {
  const response = await api.get("/users");
  return response.data;
};

// Update User
export const updateUser = async (id, userData) => {
  const response = await api.put(`/users/${id}`, userData);
  return response.data;
};

// Delete User
export const deleteUser = async (id) => {
  const response = await api.delete(`/users/${id}`);
  return response.data;
};
