interface Result {
  nDays: number;
  nTrainingDays: number;
  target: number;
  calculatedAvgTime: number;
  targetReached: boolean;
  rating: number;
  explanation: Explanation;
}

type Explanation = 'Lazy' | 'Good' | 'Great';

export const evaluateExercise = (exHours : Array<number>, target : number) : Result => {
  if (exHours.some(x => isNaN(x))) throw new Error('exHours contains NaN(s)');

  const nDays = exHours.length;
  const nTrainingDays = exHours.filter(x => x > 0).length;

  const calculatedAvgTime = exHours.reduce((sum, a) => sum + a, 0) / exHours.length;

  const targetReached = calculatedAvgTime >= target;

  const rating = 1 + (nTrainingDays > nDays / 2 ? 1 : 0) + (calculatedAvgTime > 0.5 ? 1 : 0);
  let explanation : Explanation = 'Lazy';
  if (rating > 2) {
    explanation = 'Great';
  } else if (rating > 1) {
    explanation = 'Good';
  }

  return {
    nDays, nTrainingDays, target, calculatedAvgTime, targetReached, rating, explanation
  };
};

//const exerciseHours = process.argv.slice(2, -1).map(x => Number(x));
//const target = Number(process.argv.slice(-1));

//console.log(evaluateExercise(exerciseHours, target));