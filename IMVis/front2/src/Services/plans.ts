import axios from 'axios';

const apiUrl = 'http://localhost:3003/api/plans'

interface PlanObjType {
  patientId: string;
  planId: string;
}
const getPlan = async (planObj: PlanObjType) => {
  const response = await axios.post(apiUrl, planObj);
  const data = await response.data;
  return data;
}

export default { getPlan };