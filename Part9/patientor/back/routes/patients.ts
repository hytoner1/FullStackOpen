import express from 'express';
const router = express.Router();

import patientService from '../services/patientService';

router.get('/', (_req, res) => {
  const patients = patientService.getEntries();
  res.send(patients);
});

router.post('/', (_req, res) => {
  res.send('Saving a diary!');
});

export default router;