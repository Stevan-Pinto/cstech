import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api/admin';

export const login = async (email, password) => {
  const response = await axios.post(`${API_BASE_URL}/login`, { email, password });
  return response.data; // Returns { token }
};
