import patients from '../../data/patients';
import { Patient, NonSensitivePatientEntry, NewPatient, NewEntry, Entry } from '../types';
import { v1 as uuid } from 'uuid'

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

const addPatient = (entry: NewPatient ): Patient => {
  const id = uuid();
  const newPatient = {
    id: id,
    ...entry
  }
  patients.push(newPatient);
  return newPatient;
};

const findById = (id: string): Patient | undefined => {
  const entry = patients.find(p => p.id === id);
  return entry;
};

const addEntry = (patientId: string, entry: NewEntry ): Entry => {
  const id = uuid();
  const newEntry = {
    id: id,
    ...entry
  } as Entry
  for (let index = 0; index < patients.length; index++) {
    if (patients[index].id === patientId){
      patients[index].entries.push(newEntry);
    };    
  }
  return newEntry;
};

export default {
  getEntries,
  addPatient,
  getNonSensitiveEntries,
  findById,
  addEntry
};