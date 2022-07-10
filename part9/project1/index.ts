import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';

const app = express();

app.use(express.json());

app.get('/hello', (_req, res) => {
  return res.send('Hello Full Stack!');
});

app.get('/bmi', (_req, res) => {
  if (_req.query) {
    if (_req.query.height && _req.query.weight) {
      const feedback:string = calculateBmi(Number(_req.query.height), Number(_req.query.weight));
      const result = {
        weight: Number(_req.query.weight),
        height: Number(_req.query.height),
        bmi: feedback,
      };
      return res.send(JSON.stringify(result));
    }
  } 
  return res.send(JSON.stringify({error: "malformatted parameters"}));
});

app.post('/exercises', (req, res) => {
  const body = req.body;
  const target:number = body.target;
  const dailyExercises:Array<number> = body.daily_exercises;

  if (!target || !dailyExercises){
    return res.send(JSON.stringify({error: "parameters missing"}));
  }

  const workoutDetails:Array<number> = [];
  let llok = true;
  workoutDetails.push(target);
  dailyExercises.forEach((amount: number) => {
    if (isNaN(Number(amount))){
      llok = false;
    }
    workoutDetails.push(amount);
  });
  if (llok) {
    return res.send(JSON.stringify(calculateExercises(workoutDetails)));
  } else {
    return res.send(JSON.stringify({error: "malformatted parameters"}));
  }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});