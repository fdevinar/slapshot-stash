import express from 'express';
import healthRouter from './routes/health.js';
import errorHandler from './middleware/error-handler.js';

const app = express();

app.use('/health', healthRouter);



// Error-handling middleware must be at the end
app.use(errorHandler);

export default app;