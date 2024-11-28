// import { io } from 'socket.io-client';
// import { API_URL } from '../config/api.js';
// import { getNotify } from '../routes/notifyRoutes.js';
// import { userIDProvisorio } from '../Pages/Login/Login.jsx';

// const socket = io(API_URL);

// // Função para emitir notificações
// export const sendNotification = (user, notificationData) => {
//   if (!user) {
//     console.warn('Usuário não está definido. Notificações não serão enviadas.');
//     return;
//   }

//   // Emitir notificação para o backend
//   socket.emit('createNotify', user, notificationData);

//   console.log(`Notificação enviada:`, notificationData);
// };

// // Listener para notificações emitidas pelo backend
// socket.on('broadcastNotification', async (notificationData) => {
//   // Acesse diretamente o contexto de dados
//   const { setNotifyDB } = useDataContext(); // Aqui pegamos a função setNotifyDB do contexto

//   if (userIDProvisorio.id === notificationData.user_id) {
//     alert('socket');
//     console.log('O id é igual');

//     try {
//       // Busca as notificações atualizadas
//       const notifyData = await getNotify(notificationData.user_id);
//       // Atualize o estado de notifyDB diretamente
//       setNotifyDB(notifyData); // Use a função do contexto para atualizar o estado
//     } catch (error) {
//       console.error('Erro ao buscar notificações:', error);
//     }
//   }
// });

import { io } from 'socket.io-client';
import { API_URL } from '../config/api.js';
import { getNotify } from '../routes/notifyRoutes.js';
import { userIDProvisorio } from '../Pages/Login/Login.jsx';

const socket = io(API_URL);

export const sendNotification = (user, notificationData, notifyDB, setNotifyDB) => {
  if (!user) {
    console.warn('Usuário não está definido. Notificações não serão enviadas.');
    return;
  }
  // Emitir notificação para o backend
  socket.emit('createNotify', user, notificationData);

  // Aqui você pode utilizar diretamente o setNotifyDB, já que foi passado como parâmetro
  socket.on('broadcastNotification', async (notificationData) => {
    if (userIDProvisorio.id === notificationData.user_id) {
      try {
        const notifyData = await getNotify(notificationData.user_id);
        setNotifyDB([...notifyData]); // Atualiza com nova referência
      } catch (error) {
        console.error('Erro ao buscar notificações:', error);
      }
    }
  });
};
