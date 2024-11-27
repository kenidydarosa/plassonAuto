import { io } from 'socket.io-client';
import { API_URL } from '../config/api.js';

const socket = io(API_URL);

// Função para emitir notificações
export const sendNotification = (user, notificationData) => {
  if (!user) {
    console.warn('Usuário não está definido. Notificações não serão enviadas.');
    return;
  }

  // Emitir notificação para o backend
  socket.emit('sendNotification', user, notificationData);

  console.log(`Notificação enviada:`, notificationData);
};

// Listener para notificações emitidas pelo backend
socket.on('broadcastNotification', (notificationData) => {
  console.log("Msg backend:", notificationData);
  alert("Msg backend:", notificationData);
});
