import diagnoses from '../../data/diagnoses';
import { Diagnose } from '../types';

const getEntries = (): Array<Diagnose> => {
  return diagnoses;
};

export default {
  getEntries,
};