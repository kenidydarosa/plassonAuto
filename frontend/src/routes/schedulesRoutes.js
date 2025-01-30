import axios from 'axios';
import { API_URL } from '../config/api.js';

// Função para buscar todos as reservas
export const getSchedules = async () => {
  const response = await axios.get(`${API_URL}/schedules`);

  if (response.status === 200) {
    return response.data;
  } else {
    throw new Error(response.data);
  }
};

export const getSchedulesID = async (id) => {
  const response = await axios.get(`${API_URL}/schedules/${id}`);

  if (response.status === 200) {
    return response.data;
  } else {
    throw new Error(response.data);
  }
};
export const createSchedules = async (schedule) => {
  const response = await axios.post(`${API_URL}/schedules`, schedule, {
    headers: { 'Content-Type': 'application/json' },
  });
  
  if (response.status === 200) {
    return response.data;
  } else {
    throw new Error(response.data);
  }
};

export const updateSchedules = async (id, schedule) => {
  const response = await axios.put(`${API_URL}/schedules/${id}`, schedule, {
    headers: { 'Content-Type': 'application/json' },
  });
  
  if (response.status === 200) {
    return response.data;
  } else {
    throw new Error(response.data);
  }
};

export const deleteSchedules = async (id) => {
  const response = await axios.put(`${API_URL}/schedules/${id}`);

  if (response.status === 200) {
    return response.data;
  } else {
    throw new Error(response.data);
  }
};
