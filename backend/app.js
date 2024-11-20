import 'dotenv/config';
import express, { json } from 'express';
import cors from 'cors';
import userRouter from './src/routes/userRoutes.js';
import veiculesRouter from './src/routes/veiculesRoutes.js';
import schedulesRoutes from './src/routes/shedulesRoutes.js'
import notifyRoutes from './src/routes/notifyRoutes.js'

const app = express();

app.use(express.json());
app.use(cors());
app.use('/users', userRouter);
app.use('/veicules', veiculesRouter);
app.use('/schedules', schedulesRoutes);
app.use('/notify', notifyRoutes);

app.listen(3000, () => console.log('Servidor conectado'));
