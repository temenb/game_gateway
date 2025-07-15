import app from './app';
import { config } from './config/config';

app.listen(config.port, () => {
    console.log(`🚀 Gateway running on port ${config.port}`);
});
