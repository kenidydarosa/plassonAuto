import axios from 'axios';
import { API_URL } from '../config/api.js';

// Função para buscar todos os usuários
export const getNotify = async (id) => {
  const response = await axios.get(`${API_URL}/notify/${id}`);

  if (response.status === 200) {
    return response.data;
  } else {
    throw new Error(response.data);
  }
};

// export const getNotifyByID = async (id) => {
//   const response = await axios.get(`${API_URL}/notify/${id}`);

//   if (response.status === 200) {
//     return response.data;
//   } else {
//     throw new Error(response.data);
//   }
// };
export const createNotify = async (schedule) => {
  const response = await axios.post(`${API_URL}/notify`, schedule, {
    headers: { 'Content-Type': 'application/json' },
  });
  
  if (response.status === 200) {
    return response.data;
  } else {
    throw new Error(response.data);
  }
};

export const updateNotify = async (id, schedule) => {
  const response = await axios.put(`${API_URL}/notify/${id}`, schedule, {
    headers: { 'Content-Type': 'application/json' },
  });
  
  if (response.status === 200) {
    return response.data;
  } else {
    throw new Error(response.data);
  }
};

export const deletNotify = async (id) => {
  const response = await axios.put(`${API_URL}/notify/${id}`);

  if (response.status === 200) {
    return response.data;
  } else {
    throw new Error(response.data);
  }
};
