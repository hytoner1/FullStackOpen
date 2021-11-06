import patients from '../data/patients';

import { PatientData, NonSensitivePatientData} from '../types';


const getPatientDatas = (): Array<PatientData> => {
  return patients;
};

const getNonSensitivePatientDatas = () : NonSensitivePatientData[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => (
    { id, name, dateOfBirth, gender, occupation }
  ));
};

const addEntry = () => {
  return null;
};

export default {
  getPatientDatas,
  getNonSensitivePatientDatas,
  addEntry
};