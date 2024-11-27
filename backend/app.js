// import 'dotenv/config';
// import express, { json } from 'express';
// import cors from 'cors';
// import userRouter from './src/routes/userRoutes.js';
// import veiculesRouter from './src/routes/veiculesRoutes.js';
// import schedulesRoutes from './src/routes/shedulesRoutes.js'
// import notifyRoutes from './src/routes/notifyRoutes.js'

// const app = express();

// app.use(express.json());
// app.use(cors());
// app.use('/users', userRouter);
// app.use('/veicules', veiculesRouter);
// app.use('/schedules', schedulesRoutes);
// app.use('/notify', notifyRoutes);

// app.listen(3000, () => console.log('Servidor conectado'));
import 'dotenv/config';
import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import userRouter from './src/routes/userRoutes.js';
import veiculesRouter from './src/routes/veiculesRoutes.js';
import schedulesRoutes from './src/routes/shedulesRoutes.js';
import notifyRoutes from './src/routes/notifyRoutes.js';

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST', 'PUT', 'DELETE']
    }
});

app.use(express.json());
app.use(cors());

// Outras rotas
app.use('/users', userRouter);
app.use('/veicules', veiculesRouter);
app.use('/schedules', schedulesRoutes);

// Rotas de notificação com Socket.IO
app.use('/notify', notifyRoutes(io));

// Escutar conexões Socket.IO
io.on('connection', (socket) => {
    console.log('Usuário conectado:', socket.id); // socket.id é único para cada conexão

    // Receber o nome do usuário do frontend, que será enviado após a autenticação
    socket.on('setUsername', (username) => {
        console.log(`Nome do usuário conectado: ${username}`);
        socket.name = username; // Atribui o nome do usuário ao socket para identificação posterior
    });

    // Exemplo de emissão de uma notificação para um usuário específico
    socket.on('sendNotification', (username, message) => {
        // Envia a notificação para o canal específico do usuário
        io.emit(`notification:${username}`, { message });
    });

    socket.on('disconnect', () => {
        console.log(`Usuário desconectado: ${socket.name || socket.id}`);
    });
});

// Inicializar o servidor
server.listen(3000, () => {
    console.log('Servidor iniciado na porta 3000 com Socket.IO');
});
