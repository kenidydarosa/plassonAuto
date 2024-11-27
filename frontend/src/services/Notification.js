// listenToNotifications.js
import { io } from 'socket.io-client';
import { API_URL } from '../config/api.js';

const socket = io(API_URL);

export const listenToNotifications = (userName, onNotification) => {
  if (!userName) {
    console.warn('Usuário não está definido. Notificações não serão escutadas.');
    return;
  }

  const userChannel = `notification:${userName}`;

  // Inicia a escuta para o canal do usuário
  socket.on(userChannel, (data) => {
    console.log(`Nova notificação para ${userName}:`, data);
    onNotification(data); // Chama a função de callback passando os dados da notificação
  });

  // Função para parar de escutar quando necessário
  const stopListening = () => {
    socket.off(userChannel);
  };

  return stopListening;
};

