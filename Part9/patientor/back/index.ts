import express from 'express';
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

import patientRouter from './routes/patients';
import diagnoseRouter from './routes/diagnoses';

app.use('/api/patients', patientRouter);
app.use('/api/diagnoses', diagnoseRouter);


app.get('/api/ping', (_req, res) => {
  console.log('someone pinged here');
  res.send('pong');
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});