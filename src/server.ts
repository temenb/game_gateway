import app from './app';
import { config } from './config/config';

app.listen(config.port, () => {
    console.log(`🚀 Gateway running on port ${config.port}`);
});



import app from './app';

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`🚀 Gateway is running on port ${PORT}`);
});
