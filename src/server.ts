import app from './app';
import { serviceRoutes } from './config/routes.config';
import { createProxyMiddleware } from 'http-proxy-middleware';
import { verifyToken } from './middlewares/auth.middleware';
import { traceRequest } from './middlewares/requestLogger.middleware';
import { publicPaths } from './config/publicPaths.config';

const PORT = process.env.PORT || 3000;

serviceRoutes.forEach(({ path, target }) => {
    app.use(path, traceRequest); // Логгируем входящий запрос

    // JWT-проверка ТОЛЬКО если путь не публичный
    app.use(path, (req, res, next) => {
        if (publicPaths.includes(req.path)) {
            return next(); // пропустить JWT
        }
        verifyToken(req, res, next);    // применить проверку токена
    });

    app.use(path, createProxyMiddleware({
        target,
        changeOrigin: true,
        pathRewrite: { [`^${path}`]: '' },
    }));
});

app.listen(PORT, () => {
    console.log(`🚀 Gateway is running on port ${PORT}`);
});
