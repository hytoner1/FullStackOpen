import * as React from 'react';
import {
  AppBar, IconButton, Toolbar, Typography
} from '@mui/material';

import MenuIcon from '@mui/icons-material/Menu';

export default function TopMenu() {
  return (
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
  );
}
