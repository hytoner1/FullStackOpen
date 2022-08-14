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

router.post('/', (req, res) => {
  const patientId = req.body.patientId;
  console.log('patientId:', patientId);
  if (!patientId) {
    res.status(404).send({ error: 'Parameter \'patientId\' missing' });
  }

  const patient = patientService.addPatient(patientId);
  if (patient === undefined) {
    res.status(404).send({ error: 'Patient with given ID already exists' });
  }

  res.send(patient);
});

export default router;