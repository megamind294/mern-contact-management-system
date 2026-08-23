import 'dotenv/config';
import { createApp } from './app.js';
import { connectDatabase } from './config/db.js';

const port = Number(process.env.PORT ?? 5000);
const mongoUri = process.env.MONGODB_URI ?? '';

async function start() {
  await connectDatabase(mongoUri);
  createApp().listen(port, () => {
    console.log(`Contact manager API listening on port ${port}`);
  });
}

start().catch((error) => {
  console.error('Failed to start server', error);
  process.exit(1);
});
