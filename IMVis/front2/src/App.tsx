import * as React from 'react';
import {
  Box, Container, Grid, Divider,
  Stack, Typography
} from '@mui/material';

import TopMenu from './TopMenu';
import ContextPane from './ContextPane';
import MainPane from './MainPane';
import ProTip from './ProTip';

import patients from './data/patients';
import plans from './data/plans';

const patient = patients[0];
const plan = plans[0];
const image = plan.image;
const structureset = image.structureset;

export default function App() {
  const [checkedList, setCheckedList] =
    React.useState(new Array(structureset.structures.length).fill(true));

  return (
    <Container maxWidth="lg">
      <TopMenu />

      <Box sx={{ my: 4 }}>
        <Stack direction='row' spacing={3}>
          <ContextPane patient={patient} plan={plan} checkedList={checkedList} setCheckedList={setCheckedList} />
          <Divider orientation="vertical" flexItem sx={{ mr: 1 }} />

          <Stack spacing={2}>
            <MainPane
              plan={plan}
              checkedList={checkedList}
            />
            <Typography variant="h4" component="h1" gutterBottom>
              Create React App example with TypeScript
            </Typography>
            <ProTip />
          </Stack>
        </Stack>
      </Box>
    </Container>
  );
}
