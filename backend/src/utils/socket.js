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

    // Inicialize o NotifyController com o objeto io
    const notifyController = new NotifyController(io);

    io.on('connection', (socket) => {
        // console.log('Usuário conectado:', socket.id);

        // Registrar usuário no mapeamento
        socket.on('register', (username) => {
            connectedUsers[username] = socket.id;
            // console.log(`Usuário registrado: ${username} -> ${socket.id}`);
        });

        socket.on('createNotify', async (username, notificationData) => {
            try {
                console.log(notificationData)
                // Salvar a notificação no banco de dados usando o método do NotifyController
                const savedNotification = await notifyController.createFromSocket(notificationData);
                // Emitir para todos os clientes conectados
                io.emit('broadcastNotification', { ...notificationData, id: savedNotification.id });
            } catch (error) {
                console.error('Erro ao salvar notificação:', error);
                socket.emit('errorNotification', 'Falha ao salvar notificação.');
            }
        });

        // Remover usuário ao desconectar
        socket.on('disconnect', () => {
            for (const username in connectedUsers) {
                if (connectedUsers[username] === socket.id) {
                    delete connectedUsers[username];
                    console.log(`Usuário desconectado: ${username}`);
                    break;
                }
            }
        });
    });

    return io;
}
