import 'dotenv/config';
import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import userRouter from './src/routes/userRoutes.js';
import veiculesRouter from './src/routes/veiculesRoutes.js';
import schedulesRoutes from './src/routes/shedulesRoutes.js';
import notifyRoutes from './src/routes/notifyRoutes.js';
import configureSocket from './src/utils/socket.js';

const app = express();
const server = http.createServer(app);
const io = configureSocket(server); // Configuração modular do Socket.IO

// Middleware para o Express
app.use(express.json());
app.use(cors());

// Rotas do aplicativo
app.use('/users', userRouter);
app.use('/veicules', veiculesRouter);
app.use('/schedules', schedulesRoutes);

// Rotas de notificações com Socket.IO integrado
app.use('/notify', notifyRoutes(io));

// Inicializar o servidor
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Servidor iniciado na porta ${PORT}`);
});

