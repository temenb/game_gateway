import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import { ClientRequest } from 'http';
import { connectRabbit } from './services/rabbit.service';
import { serviceRoutes } from './config/routes.config';
import { traceRequest } from './middlewares/requestLogger.middleware';
import { publicPaths } from './config/publicPaths.config';
import { verifyToken } from './middlewares/auth.middleware';
import { createProxyMiddleware } from 'http-proxy-middleware';


const app = express();


app.use(helmet());
app.use(cors({ origin: true, credentials: true }));
app.use(cookieParser());
app.use(morgan('dev'));

// 👇 Добавлено здесь
app.use(express.json());

app.use((req, res, next) => {
    req.on('data', chunk => console.log('📦 CHUNK:', chunk.toString()));
    next();
});

app.use(bodyParser.json({
    verify: (req: Request & { rawBody?: Buffer }, _res, buf) => {
        req.rawBody = buf;
    }
}));

connectRabbit();

serviceRoutes.forEach(({ path, target }) => {
    app.use(path, traceRequest);

    app.use(path, (req: Request, res: Response, next: NextFunction) => {
        if (publicPaths.includes(req.originalUrl)) {
            return next();
        }
        return verifyToken(req, res, next);
    });

    app.use(path, (req: Request, _res: Response, next: NextFunction) => {
        console.log(`Proxying ${req.method} ${req.originalUrl} to ${target}`);
        next();
    });

    const proxyOptions = {
        target,
        changeOrigin: true,
        pathRewrite: { [`^${path}`]: '' },
        timeout: 5000,
        proxyTimeout: 5000,
        selfHandleResponse: false,
        onProxyReq: (
            proxyReq: ClientRequest,
            req: Request & { rawBody?: Buffer },
            _res: Response
        ) => {
            if (req.rawBody) {
                proxyReq.setHeader('Content-Type', 'application/json');
                proxyReq.setHeader('Content-Length', Buffer.byteLength(req.rawBody));
                proxyReq.write(req.rawBody);
            }
        }
    } as any;

    app.use(path, createProxyMiddleware(proxyOptions));
});

export default app;
