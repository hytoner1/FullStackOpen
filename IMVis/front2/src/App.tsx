import * as React from 'react';
import {
  Box, Container, Divider,
  Stack, Typography
} from '@mui/material';

import TopMenu from './TopMenu';
import ContextPane from './Panes/ContextPane';
import MainPane from './Panes/MainPane';
import SpotsPane from './Panes/SpotsPane';

import patients from './data/patients';
import plans from './data/plans';
import { Dose, Field } from './types';

const patient = patients[0];
const plan = plans[0];
const image = plan.image;
const structureset = image.structureset;

const parseWeightsAndInfluences = (dose: Dose) => {
  if (!dose.fields) {
    return { tmpWeights: dose.weights, influences: dose.influences };
  }

  const tmpWeights: number[] = [];
  const influences: [number, number][][] = [];
  for (let fieldIdx = 0; fieldIdx < dose.fields.length; fieldIdx++) {
    const field = dose.fields[fieldIdx];
    for (let layerIdx = 0; layerIdx < field.layers.length; layerIdx++) {
      const layer = field.layers[layerIdx];
      for (let spotIdx = 0; spotIdx < layer.spots.length; spotIdx++) {
        tmpWeights.push(layer.spots[spotIdx].weight);
        influences.push(layer.spots[spotIdx].influence);
      }
    }
  }

  return { tmpWeights, influences };
}

export default function App() {
  const [checkedList, setCheckedList] =
    React.useState(new Array(structureset.structures.length).fill(true));

  let { tmpWeights, influences } = parseWeightsAndInfluences(plan.dose);
  const [weights, setWeights] = React.useState(tmpWeights);

  return (
    <Container maxWidth="lg">
      <TopMenu />

      <Box sx={{ my: 4 }}>
        <Stack direction='row' spacing={3}
          divider={<Divider orientation="vertical" flexItem sx={{ mr: 1 }} />}
        >
          <ContextPane patient={patient} plan={plan} checkedList={checkedList} setCheckedList={setCheckedList} />

          <Stack spacing={2}>
            <MainPane
              plan={plan}
              checkedList={checkedList}
              weights={weights}
              setWeights={setWeights}
              influences={influences}
            />
          </Stack>

          <SpotsPane weights={weights} dose={plan.dose} />
        </Stack>
      </Box>
    </Container>
  );
}
