import patients from '../data/patients';

import { PatientData, NonSensitivePatientData, NewPatientData } from '../types';

const { v1: uuid } = require('uuid');


const getPatientDatas = (): Array<PatientData> => {
  return patients;
};

const getNonSensitivePatientDatas = () : NonSensitivePatientData[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => (
    { id, name, dateOfBirth, gender, occupation }
  ));
};

const addPatient = (entry: NewPatientData) : NonSensitivePatientData => {
  const newPatient = {
    id: uuid(), ...entry
  };

  patients.push(newPatient);
  return newPatient;
};

export default {
  getPatientDatas,
  getNonSensitivePatientDatas,
  addPatient
};