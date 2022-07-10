interface MultiplyValues {
  value1: number;
  value2: number;
}

const parseArguments = (args: Array<string>): MultiplyValues => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      value1: Number(args[2]),
      value2: Number(args[3])
    };
  } else {
    throw new Error('Provided values were not numbers!');
  }
};

const calculateBmi = (a: number, b: number): string => {
  const meter:number = a/100;
  const bmi:number = b/(meter*meter);
  let result = '';
  if(bmi <= 16){
    result = 'Underweight (Severe thinness)';
  } else if (bmi <= 16.9){
    result = 'Underweight (Moderate thinness)';
  } else if (bmi <= 18.4){
    result = 'Underweight (Mild thinness)';
  } else if (bmi <= 24.9){
    result = 'Normal range';
  } else if (bmi <= 29.9){
    result = 'Overweight (Pre-obese)';
  } else if (bmi <= 34.9){
    result = 'Obese (Class I)';
  } else if (bmi <= 39.9){
    result = 'Obese (Class II)';
  } else if (bmi >= 40){
    result = 'Obese (Class III)';
  }
  console.log(result);
  return result;
};

try {
  const { value1, value2 } = parseArguments(process.argv);
  calculateBmi(value1, value2);
} catch (error: unknown) {
  let errorMessage = 'Something bad happened.';
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}

export { calculateBmi };