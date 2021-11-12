import express from 'express';
const router = express.Router();

import patientService from '../services/patientService';
import toNewPatientData from '../utils';

router.get('/', (_req, res) => {
  const patients = patientService.getPublicPatientDatas();
  res.send(patients);
});

router.get('/:id', (req, res) => {
  const patient = patientService.getPatientData(req.params.id);
  patient ? res.send(patient) : res.status(404).end();
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