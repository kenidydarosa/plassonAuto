import axios from 'axios';
import { API_URL } from '../config/api.js';

// Função para buscar todos os usuários
export const getVeicules = async () => {
  try {
    const response = await axios.get(`${API_URL}/veicules`);

    return response.data;
  } catch (error) {
    2;
    console.error('Erro ao buscar veiculos:', error);
    throw error;
  }
};

export const getVeiculeByID = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/veicules/${id}`);

    return response.data;
  } catch (error) {
    console.error('Erro ao buscar usuário:', error);
    throw error;
  }
};
export const createVeicule = async (veicule) => {

  const response = await axios.post(`${API_URL}/veicules`, veicule, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (response.status === 200) {
    return response.data;
  } else {
    throw new Error(response.data);
  }
};

export const updateVeicule = async (id, veicule) => {
  const response = await axios.put(`${API_URL}/veicules/${id}`, veicule, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (response.status === 200) {
    return response.data;
  } else {
    throw new Error(response.data);
  }
};
