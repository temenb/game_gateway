import express, { Request, Response, NextFunction } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import healthRoutes from './routes/health.routes';
import authRoutes from './routes/auth.routes';
import profileRoutes from './routes/profile.routes';
import shipRoutes from './routes/ship.routes';
import asteroidRoutes from './routes/asteroid.routes';
import {verifyToken} from "./middlewares/auth.middleware";
import cookieParser from 'cookie-parser';
import {publicPaths} from "./config/publicPaths.config";

const app = express();
app.use(express.json());
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));
app.use(cors({
    origin: '*', // ['http://localhost:8080']
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(cookieParser());

const withAuth = (req: Request, res: Response, next: NextFunction) => {
    const isPublic = publicPaths.some(path => req.path.startsWith(path));
    if (isPublic) return next();
    return verifyToken(req, res, next);
};
app.use(withAuth);

app.use('/', healthRoutes);
app.use('/auth', authRoutes);
app.use('/profile', profileRoutes);
app.use('/ship', shipRoutes);
app.use('/asteroid', asteroidRoutes);

export default app;

