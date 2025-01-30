import axios from 'axios';
import { API_URL } from '../config/api.js';

export const updateData = async (id, dataContext) => {
  try {
    const response = await axios.get(`${API_URL}/users/${id}/update`);

    // console.log(JSON.stringify(response.data.notify, null, 2));
    const { user, schedules, notify, veicules, users, sectors } = response.data;

    const { setSchedulesDB, setVeiculesDB, setNotifyDB, setUsersDB, setSectorsDB } = dataContext;
    
    setSchedulesDB(schedules);
    setVeiculesDB(veicules);
    setNotifyDB(notify);
    setUsersDB(users);
    setSectorsDB(sectors);

    return response.data;
  } catch (error) {
    console.error('Erro ao buscar usuário:', error);
    throw error;
  }
};
