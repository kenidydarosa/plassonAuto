import { io } from 'socket.io-client';
import { API_URL } from '../config/api.js';
import { getNotify, createNotify } from '../routes/notifyRoutes.js';
import { userIDProvisorio } from '../Pages/Login/Login.jsx';

const socket = io(API_URL);

// Função para emitir notificações
export const sendNotification = (user, notificationData) => {
  if (!user) {
    console.warn('Usuário não está definido. Notificações não serão enviadas.');
    return;
  }

  // Emitir notificação para o backend
  socket.emit('createNotify', user, notificationData);

  console.log(`Notificação enviada:`, notificationData);
};

// Listener para notificações emitidas pelo backend
socket.on('broadcastNotification', async (notificationData) => {
  if(userIDProvisorio.id === notificationData.user_id){
    alert('socket')
    console.log('o id é igual')
    //Verificar aqui para atualizar o estado da váriavel, usar useEfecct, 
    getNotify(notificationData.user_id)
  }
});
