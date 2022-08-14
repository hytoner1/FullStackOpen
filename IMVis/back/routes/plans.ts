import express from 'express';
const router = express.Router();

import { Dose, Img, Plan } from '../types';

import planService from '../services/planService';
import { isString } from 'node:util';

router.post('/', (req, res) => {
  const { planId, patientId } = req.body;
  if (!planId || !patientId) {
    res.status(400).send({ error: 'planId or patientId missing' });
  }

  const plan = planService.getPlan(patientId, planId);
  plan ? res.send(plan) : res.status(404).end();
});

router.post('/', (req, res) => {
  const body = req.body;
  const id: string = body.id;
  const patientId: string = body.patientId;
  if (!id || !patientId) {
    res.status(400).send({ error: 'planId or patientId missing' });
  }

  const image: Img = body.image;
  if (!image) {
    res.status(400).send({ error: 'image missing' });
  }

  const dose: Dose = body.dose;
  if (!dose) {
    res.status(400).send({ error: 'dose missing' });
  }

  const planOrError = planService.addPlan({ id, patientId, image, dose });
  if (isString(planOrError)) {
    res.status(400).send({error: planOrError})
  }
  res.send(planOrError as Plan);
});

export default router;