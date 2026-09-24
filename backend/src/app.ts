import express from 'express';
import cors from 'cors';
import healthRouter from './routes/health.js';
import errorHandler from './middleware/error-handler.js';
import setsRouter from './routes/sets.js';
import playersRouter from './routes/players.js';
import cardsRouter from './routes/cards.js';

// Whitelist specific domains
// const corsOptions = {
//     origin: ['https://yourfrontend.com', 'http://localhost:3000'],
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],
//     credentials: true // Allow cookies if needed
// };

const app = express();

app.use(express.json());
app.use(cors());
app.use('/health', healthRouter);
app.use('/sets', setsRouter);
app.use('/players', playersRouter);
app.use('/cards', cardsRouter);

// Error-handling middleware must be at the end
app.use(errorHandler);

export default app;