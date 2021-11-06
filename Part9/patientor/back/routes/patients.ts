import express from 'express';
const router = express.Router();

import patientService from '../services/patientService';

router.get('/', (_req, res) => {
  const patients = patientService.getNonSensitivePatientDatas();
  res.send(patients);
});

router.post('/', (_req, res) => {
  res.send('Saving a patient!');
});

export default router;