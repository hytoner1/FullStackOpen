import { Plan } from '../types';

import images from './images';
import doses from './doses';

const image = images[0];
const dose = doses[1];

const plans: Plan[] = [
  {
    id: 'Plan1',
    patientId: 'Patient1',
    image: image,
    dose: dose
  }
];

export default plans;