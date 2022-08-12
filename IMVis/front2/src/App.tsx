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

const patient = patients[0];
const plan = plans[0];
const image = plan.image;
const structureset = image.structureset;

export default function App() {
  const [checkedList, setCheckedList] =
    React.useState(new Array(structureset.structures.length).fill(true));
  const [weights, setWeights] = React.useState(plan.dose.weights);

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
            />
          </Stack>

          <SpotsPane weights={weights} setWeights={setWeights} />
        </Stack>
      </Box>
    </Container>
  );
}
