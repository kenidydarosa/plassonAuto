import axios from 'axios';

// const API_URL = 'http://192.168.1.4:3000';
const API_URL = 'http://10.17.30.51:3000';

// Função para buscar todos os usuários
export const fetchUsers = async () => {
  try {
    const response = await axios.get(`${API_URL}/users`);
    return response.data; 
  } catch (error) {2
    console.error('Erro ao buscar usuários:', error);
    throw error;
  }
};

// Função para fazer login (pode ser feita uma requisição POST para autenticar)
export const loginUser = async (username, password) => {
  try {
    const response = await axios.post(`${API_URL}/users/login`, { username, password });
    return response.data; 
  } catch (error) {
    console.error('Erro no login:', error);
    throw error;
  }
};
