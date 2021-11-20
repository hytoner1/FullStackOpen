import express from 'express';
const router = express.Router();

import patientService from '../services/patientService';
import { toNewPatientData, toNewEntry } from '../utils';

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

router.post('/:id/entries', (req, res) => {
  console.log('Adding Entry:', req.body);

  const patient = patientService.getPatientData(req.params.id);
  if (patient) {
    try {
      const newEntryData = toNewEntry(req.body);
      const newEntry = patientService.addEntry(patient, newEntryData);
      res.json(newEntry);
    } catch (error : unknown) {
      let errorMessage = 'Something went wrong.'
      if (error instanceof Error) {
        errorMessage += ' Error: ' + error.message;
      }
      res.status(400).send(errorMessage);
    }
  } else {
    res.status(404).send();
  }
});

export default router;