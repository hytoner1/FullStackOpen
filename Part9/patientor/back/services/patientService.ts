import patients from '../data/patients';

import {
  PatientData, PublicPatientData, NewPatientData,
  NewEntry, Entry
} from '../types';

const { v1: uuid } = require('uuid');

const getPatientData = (id : string) : PatientData | undefined => {
  return patients.find(p => p.id === id);
};

const getPatientDatas = (): Array<PatientData> => {
  return patients;
};

const getPublicPatientDatas = () : PublicPatientData[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation, entries }) => (
    { id, name, dateOfBirth, gender, occupation, entries }
  ));
};

const addPatient = (entry : NewPatientData) : PatientData => {
  const newPatient = {
    id: uuid(), ...entry
  };

  patients.push(newPatient);
  return newPatient;
};

const addEntry = (patient : PatientData, newEntry : NewEntry) : PatientData => {
  const entry : Entry = { ...newEntry, id: uuid() };
  const modifiedPatient = { ...patient, entries: patient.entries.concat(entry) };

  patients.map(p => p.id === patient.id ? modifiedPatient : p);

  return modifiedPatient;
}

export default {
  getPatientData,
  getPatientDatas,
  getPublicPatientDatas,
  addPatient,
  addEntry
};