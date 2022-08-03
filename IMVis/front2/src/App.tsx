import * as React from 'react';
import {
  Box, Container, Grid, Divider,
  Link, Typography
} from '@mui/material';

import TopMenu from './TopMenu';
import ContextPane from './ContextPane';
import MainPane from './MainPane';


export default function App() {
  return (
    <Container maxWidth="md">
      <TopMenu />

      <Box sx={{ my: 4 }}>
        <Grid container spacing={2}>
          <Grid item xs={3}>
            <ContextPane />
          </Grid>

          <Divider orientation="vertical" flexItem sx={{mr: 1}} />

          <Grid item xs={8}>
            <MainPane />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
