import axios from 'axios';

const API_URL = 'http://localhost:3001';

const api = axios.create({
  baseURL: API_URL,
});

export const getUsers = () => api.get('/users');
export const getUserById = (id) => api.get(`/users/${id}`);
export const updateUser = (id, updatedUserData) => api.patch(`/users/${id}`, updatedUserData);

export const getDataPackages = () => api.get('/data_packages');
export const getDataPackageById = (id) => api.get(`/data_packages/${id}`);