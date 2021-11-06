import diagnoses from '../data/diagnoses';

import { DiagnoseData } from '../types';


const getDiagnoseDatas = (): Array<DiagnoseData> => {
  return diagnoses;
};

const addEntry = () => {
  return null;
};

export default {
  getDiagnoseDatas,
  addEntry
};