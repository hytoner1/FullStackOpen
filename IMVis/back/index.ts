import express from 'express';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors());

import patientRouter from './routes/patients';
import planRouter from './routes/plans';

app.use('/api/patients', patientRouter);
app.use('/api/plans', planRouter);

app.get('/api/ping', (_req, res) => {
  res.send('pong');
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});