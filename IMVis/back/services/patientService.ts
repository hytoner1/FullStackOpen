import patients from '../data/patients';

import { Patient } from '../types';

let patientList = [...patients];

const getPatients = (): Patient[] => {
  return patientList;
};

const getPatient = (id: string): Patient | undefined => {
  return patientList.find(p => p.id === id);
};

export default { getPatients, getPatient };