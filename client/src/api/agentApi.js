import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api/agents';

export const getAgents = async (token) => {
  const response = await axios.get(API_BASE_URL, { headers: { Authorization: `Bearer ${token}` } });
  return response.data;
};

export const addAgent = async (agentData, token) => {
  const response = await axios.post(API_BASE_URL, agentData, { headers: { Authorization: `Bearer ${token}` } });
  return response.data;
};

export const updateAgent = async (id, agentData, token) => {
  const response = await axios.put(`${API_BASE_URL}/${id}`, agentData, { headers: { Authorization: `Bearer ${token}` } });
  return response.data;
};

export const deleteAgent = async (id, token) => {
  const response = await axios.delete(`${API_BASE_URL}/${id}`, { headers: { Authorization: `Bearer ${token}` } });
  return response.data;
};
