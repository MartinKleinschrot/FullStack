import patients from '../../data/patients';
import { Patient, NonSensitivePatientEntry } from '../types';

const getEntries = (): Array<Patient> => {
  return patients;
};

const getNonSensitiveEntries = (): NonSensitivePatientEntry[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const addPatient = () => {
  return null;
};

export default {
  getEntries,
  addPatient,
  getNonSensitiveEntries
};