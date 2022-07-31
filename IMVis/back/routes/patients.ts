import express from 'express';
const router = express.Router();

import patientService from '../services/patientService';

router.get('/', (_req, res) => {
  const patients = patientService.getPatients()
  res.send(patients);
});

router.get('/:id', (req, res) => {
  const patient = patientService.getPatient(req.params.id);
  patient ? res.send(patient) : res.status(404).end();
});

export default router;