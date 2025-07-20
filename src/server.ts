import app from './app';
import { serviceRoutes } from './config/routes.config';
import { createProxyMiddleware } from 'http-proxy-middleware';
import { verifyToken } from './middlewares/auth.middleware';
import { traceRequest } from './middlewares/requestLogger.middleware';

const PORT = process.env.PORT || 3000;


serviceRoutes.forEach(({ path, target }) => {
    app.use(path, traceRequest);        // Логгируем входящий запрос
    app.use(path, verifyToken);         // Проверяем JWT (можно отключить для public routes)

    app.use(path, createProxyMiddleware({
        target: target,
        changeOrigin: true,
        pathRewrite: { [`^${path}`]: '' },
    }));
});

app.listen(PORT, () => {
    console.log(`🚀 Gateway is running on port ${PORT}`);
});







