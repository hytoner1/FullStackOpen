import plans from '../data/plans';

import { Plan } from '../types';

let planList = [...plans];

const getPlan = (patientId: string, planId: string): Plan | undefined => {
  return planList.find(x => x.id === planId && x.patientId === patientId);
};

export default { getPlan };