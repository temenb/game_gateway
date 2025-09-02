import express, { Request, Response, NextFunction } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import healthRoutes from './routes/health.routes';
import {verifyToken} from "./middlewares/auth.middleware";
import cookieParser from 'cookie-parser';
import {publicPaths} from "./config/publicPaths.config";
import {anonymousSignIn} from "./grpc/clients/auth.client";

const app = express();
app.use(express.json());
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));
app.use(cors({
    origin: '*', // ['http://localhost:8080']
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(cookieParser());

// const withAuth = (req: Request, res: Response, next: NextFunction) => {
//     const isPublic = publicPaths.some(path => req.path.startsWith(path));
//     if (isPublic) return next();
//     return verifyToken(anonymousSignIn)(req, res, next)
// };
// app.use(withAuth);

app.use('/', healthRoutes);

export default app;

