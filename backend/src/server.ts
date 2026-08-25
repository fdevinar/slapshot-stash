import { config } from './config.js';
import app from './app.js';
import 'dotenv/config'

app.listen(config.port, () => {
  console.log(`Express server running on http://localhost:${config.port}`);
});