import express from 'express';
import healthRouter from './routes/health.js';
import errorHandler from './middleware/error-handler.js';
import setsRouter from './routes/sets.js';

const app = express();

app.use(express.json());
app.use('/health', healthRouter);
app.use('/sets', setsRouter);


// Error-handling middleware must be at the end
app.use(errorHandler);

export default app;