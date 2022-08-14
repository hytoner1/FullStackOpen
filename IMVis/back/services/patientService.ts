import patients from '../data/patients';

import { Patient } from '../types';

let patientList = [...patients];

const getPatients = (): Patient[] => {
  return patientList;
};

const getPatient = (id: string): Patient | undefined => {
  return patientList.find(p => p.id === id);
};

const addPatient = (id: string): Patient | undefined => {
  if (patientList.find(p => p.id === id)) {
    return undefined;
  }

  const newPatient: Patient = {
    id,
    planIds: []
  };
  patientList.push(newPatient);

  return newPatient;
};

export default { getPatients, getPatient, addPatient };