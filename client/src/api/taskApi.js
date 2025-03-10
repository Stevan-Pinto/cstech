import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api/tasks';

export const uploadCSV = async (formData, token) => {
  const response = await axios.post(`${API_BASE_URL}/upload`, formData, {
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' },
  });
  return response.data;
};

export const getTasks = async (token) => {
  const response = await axios.get(API_BASE_URL, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};
