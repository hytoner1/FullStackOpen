import patients from '../data/patients';

import { PatientEntry } from '../types';


const getEntries = (): Array<PatientEntry> => {
  return patients;
};

const addEntry = () => {
  return null;
};

export default {
  getEntries,
  addEntry
};