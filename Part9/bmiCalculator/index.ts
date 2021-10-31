import express = require('express');
const app = express();

import { calculateBmi } from './bmiCalculator';


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

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});