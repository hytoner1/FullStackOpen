export const calculateBmi = (height: number, mass: number): string => {
  const bmi = mass / Math.pow(height/100, 2);
  if (bmi < 16.0) {
    return 'Underweight (Severe thinness)';
  } else if (bmi < 17.0) {
    return 'Underweight(Moderate thinness)';
  } else if (bmi < 18.5) {
    return 'Underweight (Mild thinness)';
  } else if (bmi < 25.0) {
    return 'Normal range';
  } else if (bmi < 30.0) {
    return 'Overweight (Pre-obese)';
  } else if (bmi < 35.0) {
    return 'Obese (Class I)';
  } else if (bmi < 40.0) {
    return 'Obese (Class II)';
  } else if (bmi >= 40.0) {
    return 'Obese (Class III)';
  }

  return `How did we end up here?\n  mass: ${mass}, height: ${height}, bmi: ${bmi}`;
};


//const height = Number(process.argv[2]);
//const mass = Number(process.argv[3]);

//try {
//  console.log(calculateBMI(height, mass));
//} catch (error : unknown) {
//  let errorMessage = 'Something went wrong.'
//  if (error instanceof Error) {
//    errorMessage += ' Error: ' + error.message;
//  }
//  console.log(errorMessage);
//}
