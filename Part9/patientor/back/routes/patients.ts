import express from 'express';
const router = express.Router();

import patientService from '../services/patientService';
import toNewPatientData from '../utils';

router.get('/', (_req, res) => {
  const patients = patientService.getNonSensitivePatientDatas();
  res.send(patients);
});

router.post('/', (req, res) => {
  try {
    const newPatientData = toNewPatientData(req.body);
    const newPatient = patientService.addPatient(newPatientData);
    res.json(newPatient);
  } catch (error : unknown) {
    let errorMessage = 'Something went wrong.'
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

export default router;