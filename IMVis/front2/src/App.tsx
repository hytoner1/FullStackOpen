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
import images from './data/images';
import influences from './data/influences';

const patient = patients[0];
const image = images[0];
const influence = influences[0];

export default function App() {
  const [checkedList, setCheckedList] =
    React.useState(new Array(image.structureset.structures.length).fill(true));

  return (
    <Container maxWidth="lg">
      <TopMenu />

      <Box sx={{ my: 4 }}>
        <Stack direction='row' spacing={3}>
          <ContextPane patient={patient} image={image} checkedList={checkedList} setCheckedList={setCheckedList} />
          <Divider orientation="vertical" flexItem sx={{ mr: 1 }} />

          <Stack spacing={2}>
            <MainPane
              image={image}
              checkedList={checkedList}
              influence={influence}
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
