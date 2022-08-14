import plans from '../data/plans';

import { Plan } from '../types';

import patientService from './patientService';

let planList = [...plans];

const getPlan = (patientId: string, planId: string): Plan | undefined => {
  return planList.find(x => x.id === planId && x.patientId === patientId);
};

const addPlan = (plan: Plan): Plan | string => {
  if (patientService.getPatients().find(x => x.id === plan.patientId) === undefined) {
    return 'Patient with given \'patientId\' does not exist';
  }

  if (planList.find(x => x.id === plan.id && x.patientId === plan.patientId)) {
    return 'Plan with given ID and \'patientId\' already exists';
  }

  planList.push(plan);
  return plan;
}

export default { getPlan, addPlan };