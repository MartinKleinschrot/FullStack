interface WorkoutValues {
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number,
}

const parseArguments = (args: Array<string>): Array<number> => {
  if (args.length < 4) throw new Error('Not enough arguments');

  const workoutDetails:Array<number> = [];
  for (let index = 2; index < args.length; index++) {
    if (isNaN(Number(args[index]))){
      throw new Error('Arguments need to be numbers');
    } else {
      workoutDetails.push(Number(args[index]));
    }
  }

  return workoutDetails;
};

const calculateExercises = (workoutDetails: Array<number>): WorkoutValues => {
  let counter = 0;
  let amount = 0;
  let success = false;
  let rating = 0;
  let ratingDescription = '';
  let average = 0;
  const period = workoutDetails.length - 1;
  const target = workoutDetails[0];

  workoutDetails.forEach(element => {
    if(element > 0) counter++;
    amount = amount + element;
  });
  amount = amount - workoutDetails[0];
  average = amount/period;
  
  if((amount/period) >= target) {
    success = true;
  }

  
  if(average < 1) {
    rating = 0;
    ratingDescription = 'poor';
  } else if(average < 1.5) {
    rating = 1;
    ratingDescription = 'better';
  } else if(average < 2) {
    rating = 2;
    ratingDescription = 'good';
  } else if(average >= 2) {
    rating = 3;
    ratingDescription = 'awesome';
  }

  const result = {
    periodLength : period,
    trainingDays: counter,
    success: success,
    rating: rating,
    ratingDescription: ratingDescription,
    target: target,
    average: average,
  };
  console.log(result);
  return result;
};

try {
  const values = parseArguments(process.argv);
  calculateExercises(values);
} catch (error: unknown) {
  let errorMessage = 'Something bad happened.';
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}

export { calculateExercises };