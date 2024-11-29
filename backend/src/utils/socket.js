import { Server } from 'socket.io';
import NotifyController from '../controllers/NotifyController.js';

const connectedUsers = {}; // Mapeamento de usuários conectados

export default async function configureSocket(server) {
    const io = new Server(server, {
        cors: {
            origin: '*',
            methods: ['GET', 'POST', 'PUT', 'DELETE'],
        },
    });

    const notifyController = new NotifyController(io);

    io.on('connection', (socket) => {
        // Registrar usuário no mapeamento usando o user_id
        socket.on('register', (userId) => {
            connectedUsers[userId] = socket.id;
        });

        // Enviar notificação para usuário específico
        socket.on('createNotify', async (notificationData) => {
            const { user_id } = notificationData;

            try {
                // Salvar a notificação no banco de dados
                const savedNotification = await notifyController.createFromSocket(notificationData);

                // Verifica se o usuário está conectado
                const recipientSocketId = connectedUsers[user_id];
                if (recipientSocketId) {
                    io.to(recipientSocketId).emit('personalNotification', {
                        ...notificationData,
                        id: savedNotification.id,
                    });
                } else {
                    console.warn(`Usuário com user_id ${user_id} não está conectado.`);
                }
            } catch (error) {
                console.error('Erro ao salvar ou enviar notificação:', error);
                socket.emit('errorNotification', 'Falha ao salvar ou enviar notificação.');
            }
        });

        // Remover usuário ao desconectar
        socket.on('disconnect', () => {
            for (const userId in connectedUsers) {
                if (connectedUsers[userId] === socket.id) {
                    delete connectedUsers[userId];
                    break;
                }
            }
        });
    });

    return io;
}
