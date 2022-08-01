import * as React from 'react';
import ProTip from './ProTip';
import {
  AppBar, Box, Container,
  Grid, IconButton, Link,
  Toolbar, Typography
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}.
    </Typography>
  );
}

export default function App() {
  return (
    <Container maxWidth="sm">
      <AppBar position="static">
        <Toolbar variant="dense">
          <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" color="inherit" component="div">
            Toolbar
          </Typography>
        </Toolbar>
      </AppBar>

      <Box sx={{ my: 4 }}>
        <Grid container spacing={2}>
          <Grid item xs={2}>
            <Typography >
              Hello
            </Typography>
          </Grid>

          <Grid item xs={10}>
            <Typography variant="h4" component="h1" gutterBottom>
              Create React App example with TypeScript
            </Typography>
            <ProTip />
            <Copyright />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
