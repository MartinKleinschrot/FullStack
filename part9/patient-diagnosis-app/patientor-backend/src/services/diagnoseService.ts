import diagnoses from '../../data/diagnoses';
import { Diagnose } from '../types';

const getEntries = (): Array<Diagnose> => {
  return diagnoses;
};

const findByCode = (code: string): Diagnose | undefined => {
  const entry = diagnoses.find(d => d.code === code);
  return entry;
};

export default {
  getEntries,
  findByCode,
};