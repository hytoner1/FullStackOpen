import patients from '../data/patients';

import {
  PatientData, PublicPatientData, NewPatientData,
  NewEntry, Entry
} from '../types';

const { v1: uuid } = require('uuid');

let patientList = [...patients];

const getPatientData = (id : string) : PatientData | undefined => {
  return patientList.find(p => p.id === id);
};

const getPatientDatas = (): Array<PatientData> => {
  return patientList;
};

const getPublicPatientDatas = () : PublicPatientData[] => {
  return patientList.map(({ id, name, dateOfBirth, gender, occupation, entries }) => (
    { id, name, dateOfBirth, gender, occupation, entries }
  ));
};

const addPatient = (entry : NewPatientData) : PatientData => {
  const newPatient = {
    id: uuid(), ...entry
  };

  patientList.push(newPatient);
  return newPatient;
};

const addEntry = (patient : PatientData, newEntry : NewEntry) : PatientData => {
  const entry : Entry = { ...newEntry, id: uuid() };
  const modifiedPatient = { ...patient, entries: patient.entries.concat(entry) };
  console.log('mod patient', modifiedPatient);

  patientList = patientList.map(p => p.id === modifiedPatient.id ? modifiedPatient : p);
  console.log('patients', patientList);

  return modifiedPatient;
}

export default {
  getPatientData,
  getPatientDatas,
  getPublicPatientDatas,
  addPatient,
  addEntry
};