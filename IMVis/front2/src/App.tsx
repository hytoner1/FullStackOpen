import * as React from 'react';
import {
  Box, Container, Grid, Divider,
  Stack, Typography
} from '@mui/material';

import TopMenu from './TopMenu';
import ContextPane from './ContextPane';
import MainPane from './MainPane';
import ProTip from './ProTip';


export default function App() {
  return (
    <Container maxWidth="lg">
      <TopMenu />

      <Box sx={{ my: 4 }}>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <ContextPane />
          </Grid>

          <Divider orientation="vertical" flexItem sx={{ mr: 1 }} />

          <Grid item xs={7}>
            <Stack spacing={2}>
              <MainPane />
              <Typography variant="h4" component="h1" gutterBottom>
                Create React App example with TypeScript
              </Typography>
              <ProTip />
            </Stack>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
