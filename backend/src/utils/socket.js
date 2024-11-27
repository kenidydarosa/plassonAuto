import { Server } from 'socket.io';

const connectedUsers = {}; // Mapeamento de usuários conectados

export default function configureSocket(server) {
    const io = new Server(server, {
        cors: {
            origin: '*',
            methods: ['GET', 'POST', 'PUT', 'DELETE'],
        },
    });

    io.on('connection', (socket) => {
        console.log('Usuário conectado:', socket.id);

        // Registrar usuário no mapeamento
        socket.on('register', (username) => {
            connectedUsers[username] = socket.id;
            console.log(`Usuário registrado: ${username} -> ${socket.id}`);
        });

        // Receber notificações e retransmitir para todos os usuários
        socket.on('sendNotification', (username, notificationData) => {
            console.log(`Notificação recebida de ${username}:`, notificationData);

            // Emitir para todos os clientes conectados
            io.emit('broadcastNotification', notificationData);

            console.log(`Notificação emitida para todos os usuários.`);
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
