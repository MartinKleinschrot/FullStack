import { NewPatient, Gender, NewEntry } from './types';

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const parseString = (comment: unknown): string => {
  if (!comment || !isString(comment)) {
    throw new Error('Incorrect or missing comment');
  }

  return comment;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (param: any): param is Gender => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.values(Gender).includes(param);
};

const parseGender = (gender: unknown): Gender => {
  if (!gender || !isGender(gender)) {
      throw new Error('Incorrect or missing gender: ' + gender);
  }
  return gender;
};

type Fields = { name: unknown, dateOfBirth: unknown, ssn: unknown, gender: unknown, occupation: unknown };

export const toNewPatient = ({ name, dateOfBirth, ssn, gender, occupation } : Fields): NewPatient => {
  const newEntry: NewPatient = {
    name: parseString(name),
    dateOfBirth: parseString(dateOfBirth),
    ssn: parseString(ssn),
    gender: parseGender(gender),
    occupation: parseString(occupation),
    entries: [],
  };

  return newEntry;
};

const isNumber = (number: unknown): number is number => {
  return typeof number === 'number' || number instanceof Number;
};

const parseNumber = (number: unknown): number => {
  if (!isNumber(number)) {
    throw new Error('Incorrect or missing number');
  }

  return number;
};

const isStringArray = (array: unknown): array is string[] => {
  return typeof array === 'object' || array instanceof Array;
};

const parseStringArray = (array: unknown): string[] => {
  if (!array){
    throw new Error('Missing array');
  } else {
    if (isStringArray(array)){
      array.forEach(element => {
        if(!isString(element)){
          throw new Error('array not filled with strings');
        }
      });
    } else {
      throw new Error('Incorrect array');
    }
  }

  return array;
};

const isDischargeObject = (object: unknown): object is {date: string, criteria: string} => {
  return typeof object === 'object' || object instanceof Object;
};

const isSickLeaveObject = (object: unknown): object is {startDate: string, endDate: string} => {
  return typeof object === 'object' || object instanceof Object;
};

const parseDischarge = (discharge: unknown): {date: string, criteria: string} => {
  if (!discharge){
    throw new Error('Missing discharge object');
  } else {
    if (isDischargeObject(discharge) && isString(discharge.date) && isString(discharge.date)){
    } else {
      throw new Error('Incorrect discharge object');
    }
  }

  return discharge;
};

const parseSickLeave = (sickLeave: unknown): {startDate: string, endDate: string} => {
  if (!sickLeave){
    throw new Error('Missing sickLeave object');
  } else {
    if (isSickLeaveObject(sickLeave) && isString(sickLeave.startDate) && isString(sickLeave.endDate)){
    } else {
      throw new Error('Incorrect sickLeave object');
    }
  }

  return sickLeave;
};

type EntryFields = { date: unknown, type: unknown, specialist: unknown, description: unknown, healthCheckRating: unknown, diagnosisCodes: unknown, discharge: unknown, employerName: unknown, sickLeave: unknown };

const HealthCheckWithDiagnosis = ({ date, type, specialist, description, healthCheckRating, diagnosisCodes } : EntryFields): NewEntry => {
  const newEntry = {
    diagnosisCodes: parseStringArray(diagnosisCodes),
    date: parseString(date),
    type: parseString(type),
    specialist: parseString(specialist),
    description: parseString(description),
    healthCheckRating: parseNumber(healthCheckRating),
  };
  return newEntry as NewEntry;
}

const HealthCheck = ({ date, type, specialist, description, healthCheckRating } : EntryFields): NewEntry => {
  const newEntry = {
    date: parseString(date),
    type: parseString(type),
    specialist: parseString(specialist),
    description: parseString(description),
    healthCheckRating: parseNumber(healthCheckRating),
  };
  return newEntry as NewEntry;
}

const HospitalWithDiagnosis = ({ date, type, specialist, description, diagnosisCodes, discharge } : EntryFields): NewEntry => {
  const newEntry = {
    diagnosisCodes: parseStringArray(diagnosisCodes),
    date: parseString(date),
    type: parseString(type),
    specialist: parseString(specialist),
    description: parseString(description),
    discharge: parseDischarge(discharge),
  };
  return newEntry as NewEntry;
}

const Hospital = ({ date, type, specialist, description, discharge } : EntryFields): NewEntry => {
  const newEntry = {
    date: parseString(date),
    type: parseString(type),
    specialist: parseString(specialist),
    description: parseString(description),
    discharge: parseDischarge(discharge),
  };
  return newEntry as NewEntry;
}

const OccupationalWithDiagnosisAndSickLeave = ({ date, type, specialist, description, diagnosisCodes, employerName, sickLeave } : EntryFields): NewEntry => {
  const newEntry = {
    diagnosisCodes: parseStringArray(diagnosisCodes),
    date: parseString(date),
    type: parseString(type),
    specialist: parseString(specialist),
    description: parseString(description),
    employerName: parseString(employerName),
    sickLeave: parseSickLeave(sickLeave),
  };
  return newEntry as NewEntry;
}

const OccupationalWithDiagnosis = ({ date, type, specialist, description, diagnosisCodes, employerName } : EntryFields): NewEntry => {
  const newEntry = {
    diagnosisCodes: parseStringArray(diagnosisCodes),
    date: parseString(date),
    type: parseString(type),
    specialist: parseString(specialist),
    description: parseString(description),
    employerName: parseString(employerName),
  };
  return newEntry as NewEntry;
}

const OccupationalWithSickLeave = ({ date, type, specialist, description, employerName, sickLeave } : EntryFields): NewEntry => {
  const newEntry = {
    sickLeave: parseSickLeave(sickLeave),
    date: parseString(date),
    type: parseString(type),
    specialist: parseString(specialist),
    description: parseString(description),
    employerName: parseString(employerName),
  };
  return newEntry as NewEntry;
}

const Occupational = ({ date, type, specialist, description, employerName } : EntryFields): NewEntry => {
  const newEntry = {
    date: parseString(date),
    type: parseString(type),
    specialist: parseString(specialist),
    description: parseString(description),
    employerName: parseString(employerName),
  };
  return newEntry as NewEntry;
}

export const toNewEntry = ({ date, type, specialist, description, healthCheckRating, diagnosisCodes, discharge, employerName, sickLeave } : EntryFields): NewEntry => {
  if (type === "Hospital"){
    if (diagnosisCodes){
      return HospitalWithDiagnosis({date, type, specialist, description, healthCheckRating, diagnosisCodes, discharge, employerName, sickLeave});
    } else {
      return Hospital({date, type, specialist, description, healthCheckRating, diagnosisCodes, discharge, employerName, sickLeave});
    }
  } else if (type === "HealthCheck") {
    if (diagnosisCodes){
      return HealthCheckWithDiagnosis({date, type, specialist, description, healthCheckRating, diagnosisCodes, discharge, employerName, sickLeave});
    } else {
      return HealthCheck({date, type, specialist, description, healthCheckRating, diagnosisCodes, discharge, employerName, sickLeave});
    }
  } else if (type === "OccupationalHealthcare") {
    if (diagnosisCodes){
      if (sickLeave) {
        return OccupationalWithDiagnosisAndSickLeave({date, type, specialist, description, healthCheckRating, diagnosisCodes, discharge, employerName, sickLeave});
      } else {
        return OccupationalWithDiagnosis({date, type, specialist, description, healthCheckRating, diagnosisCodes, discharge, employerName, sickLeave});
      }
    } else {
      if (sickLeave){
        return OccupationalWithSickLeave({date, type, specialist, description, healthCheckRating, diagnosisCodes, discharge, employerName, sickLeave});
      } else {
        return Occupational({date, type, specialist, description, healthCheckRating, diagnosisCodes, discharge, employerName, sickLeave});
      }
    }
  } else {
    throw new Error('Incorrect entry type');
  }
};
