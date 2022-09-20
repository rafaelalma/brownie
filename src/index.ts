import express from 'express';
import dotenv from 'dotenv';
dotenv.config();

import dogRouter from './routes/dogRouter';

const app = express();
app.use(express.json());

const PORT = process.env.PORT ?? 3001;

app.get('/ping', (_req, res) => {
  console.log('Someone pinged here');
  res.send('pong');
});

app.use('/api/dogs', dogRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
