import * as React from 'react';

import patientService from './Services/patients';
import planService from './Services/plans';

import {
  Box, Container, Divider,
  Stack
} from '@mui/material';

import TopMenu from './TopMenu';
import ContextPane from './Panes/ContextPane';
import MainPane from './Panes/MainPane';
import SpotsPane from './Panes/SpotsPane';

import { Dose, Plan, Patient } from './types';

const parseWeightsAndInfluences = (dose: Dose) => {
  if (!dose.fields) {
    return { tmpWeights: dose.weights, tmpInfluences: dose.influences };
  }

  const tmpWeights: number[] = [];
  const tmpInfluences: [number, number][][] = [];

  for (let fieldIdx = 0; fieldIdx < dose.fields.length; fieldIdx++) {
    const field = dose.fields[fieldIdx];

    for (let layerIdx = 0; layerIdx < field.layers.length; layerIdx++) {
      const layer = field.layers[layerIdx];

      for (let spotIdx = 0; spotIdx < layer.spots.length; spotIdx++) {
        tmpWeights.push(layer.spots[spotIdx].weight);
        tmpInfluences.push(layer.spots[spotIdx].influence);
      }
    }
  }

  return { tmpWeights, tmpInfluences };
}

export default function App() {
  const [patient, setPatient] = React.useState<Patient | undefined>(undefined);
  const [plan, setPlan] = React.useState<Plan | undefined>(undefined);
  const [weights, setWeights] = React.useState<number[]>([]);
  const [influences, setInfluences] = React.useState<[number, number][][]>([]);
  const [checkedList, setCheckedList] = React.useState<boolean[]>([]);

  const getSetPatient = async () => {
    const patients: Patient[] = await patientService.getAll();
    setPatient(patients[0]);
  }

  const getSetPlan = async (patientId: string, planId: string) => {
    const plan: Plan = await planService.getPlan({ patientId, planId });
    setPlan(plan);
  }

  React.useEffect(() => {
    if (patient === undefined) {
      getSetPatient();
      return;
    }

    if (plan === undefined) {
      getSetPlan(patient.id, patient.planIds[0]);
      return;
    }

    const { tmpWeights, tmpInfluences } = parseWeightsAndInfluences(plan.dose);
    setWeights(tmpWeights);
    setInfluences(tmpInfluences);

  }, [patient, plan]);

  return (
    <Container maxWidth="lg">
      <TopMenu />

      <Box sx={{ my: 4 }}>
        <Stack direction='row' spacing={3}
          divider={<Divider orientation="vertical" flexItem sx={{ mr: 1 }} />}
        >
          {
            patient !== undefined && plan !== undefined &&
            <ContextPane patient={patient} plan={plan} checkedList={checkedList} setCheckedList={setCheckedList} />
          }
          {
            plan !== undefined && weights.length > 0 && influences.length > 0 &&
            <MainPane
              plan={plan}
              checkedList={checkedList}
              weights={weights}
              setWeights={setWeights}
              influences={influences}
            />
          }
          {
            plan !== undefined && weights.length > 0 &&
            <SpotsPane weights={weights} dose={plan.dose} />
          }
        </Stack>
      </Box>
    </Container>
  );
}
