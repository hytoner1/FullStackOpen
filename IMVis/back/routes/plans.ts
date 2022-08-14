import express from 'express';
const router = express.Router();

import planService from '../services/planService';

router.post('/', (req, res) => {
  const { planId, patientId } = req.body;
  if (!planId || !patientId) {
    res.status(400).send({ error: 'planId or patientId missing' });
  }

  const plan = planService.getPlan(patientId, planId);
  plan ? res.send(plan) : res.status(404).end();
});

export default router;