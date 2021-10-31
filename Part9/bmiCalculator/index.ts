import express = require('express');
const app = express();
app.use(express.json());

import { isArray } from 'node:util';

import { calculateBmi } from './bmiCalculator';
import { evaluateExercise } from './exerciseCalculator';


app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const { weight, height } = req.query;

  if (isNaN(Number(height)) || isNaN(Number(weight))) {
    res.send({ error: "Malformatted parameters" });
  }

  const resStr = calculateBmi(Number(height), Number(weight));
  res.send({
    weight,
    height,
    bmi: resStr
  });
});

app.post('/exercises', (req, res) => {
  console.log('exercises:', req.body);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-explicit-any
  const { daily_exercises, target }: any = req.body;

  if (!daily_exercises || !target) {
    res.send({ error: "parameters missing" });
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
  if (!isArray(daily_exercises) || daily_exercises.map((x : string) => Number(x)).some((x : number) => isNaN(x)) || isNaN(Number(target))) {
    res.send({ error: "malformatted parameter(s)" });
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  const result = evaluateExercise(daily_exercises, target);
  res.send(result);
});


const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});