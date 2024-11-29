import { io } from 'socket.io-client';
import { API_URL } from '../config/api.js';
import { getNotify } from '../routes/notifyRoutes.js';

const socket = io(API_URL);

export const initializeSocket = (user) => {
  if (user) {
    socket.emit('register', user.id); // Use o ID do usuário
    console.log('Usuário registrado no socket:', user.id);
  } else {
    console.warn('Usuário não definido. Registro no socket não será enviado.');
  }
};

export const sendNotification = (user, notificationData) => {
  if (!user) {
    console.warn('Usuário não está definido. Notificações não serão enviadas.');
    return;
  }

  // Emitir notificação para o backend usando user_id
  socket.emit('createNotify', notificationData);
};

export const setupNotificationListener = (user, setNotifyDB) => {
  socket
    .off('personalNotification')
    .on('personalNotification', async (receivedNotification) => {
      if (user?.id === receivedNotification.user_id) {
        try {
          const notifyData = await getNotify(receivedNotification.user_id);
          setNotifyDB([...notifyData]);
        } catch (error) {
          console.error('Erro ao buscar notificações:', error);
        }
      } else {
        console.log('Notificação recebida não pertence ao usuário atual.');
      }
    });
};
