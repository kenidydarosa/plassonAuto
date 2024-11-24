import axios from 'axios';
import { API_URL } from '../config/api.js';

// Função para fazer login (pode ser feita uma requisição POST para autenticar)
export const loginUser = async (username, password) => {
  const response = await axios.post(`${API_URL}/users/login`, { username, password });

  if (response.status === 200) {
    return response.data;
  } else {
    throw new Error(response.data);
  }
};

// Função para buscar todos os usuários
export const getUsers = async () => {
  try {
    const response = await axios.get(`${API_URL}/users`);

    return response.data;
  } catch (error) {
    2;
    console.error('Erro ao buscar usuários:', error);
    throw error;
  }
};

export const getUserByID = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/users/${id}`);

    return response.data;
  } catch (error) {
    console.error('Erro ao buscar usuário:', error);
    throw error;
  }
};

export const updateUser = async (user) => {
  const response = await axios.put(`${API_URL}/users/${user.id}`, user, {
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

export const deleteUser = async (user) => {
  const response = await axios.delete(`${API_URL}/users/${user.id}`);
  if (response.status === 200) {
    return response.data;
  } else {
    throw new Error(response.data);
  }
};