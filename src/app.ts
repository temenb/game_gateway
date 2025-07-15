import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import { connectRabbit } from './services/rabbit.service';
import proxyRoutes from './routes/proxy.routes';

const app = express();

app.use(helmet());
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(cookieParser());
app.use(morgan('dev'));

connectRabbit();

app.use('/api', proxyRoutes);

export default app;
