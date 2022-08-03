import * as React from 'react';
import {
  List, ListItemButton, ListItemIcon, ListItemText, Collapse, ListSubheader
} from '@mui/material';

import PersonIcon from '@mui/icons-material/Person';
import CollectionsIcon from '@mui/icons-material/Collections';
import InterestsIcon from '@mui/icons-material/Interests';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

import patients from './data/patients';
import images from './data/images';

import { Structure } from './types';
const patient = patients[0];
const image = images[0];

function renderStructure(structure: Structure) {
  return (
    <ListItemButton key={structure.id}>
      <ListItemIcon sx={{ ml: 4, mr: -3, color: structure.color }}>
        <CollectionsIcon />
      </ListItemIcon>
      <ListItemText primary={structure.id} />
    </ListItemButton>
  );
}

export default function ContextPane() {
  const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <List
      sx={{ width: '100%', maxWidth: 200 }}
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader component="div" id="nested-list-subheader">
          Context
        </ListSubheader>
      }
    >
      <ListItemButton>
        <ListItemIcon sx={{ ml: 0, mr: -3 }}>
          <PersonIcon />
        </ListItemIcon>
        <ListItemText primary={patient.id} />
      </ListItemButton>

      <ListItemButton>
        <ListItemIcon sx={{ ml: 2, mr: -3 }}>
          <CollectionsIcon />
        </ListItemIcon>
        <ListItemText primary={image.id} />
      </ListItemButton>

      <ListItemButton onClick={handleClick}>
        <ListItemIcon sx={{ ml: 2, mr: -3 }}>
          <InterestsIcon />
        </ListItemIcon>
        <ListItemText primary={image.structureset?.id} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>

      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {image.structureset.structures.map((structure: Structure) => (
            renderStructure(structure)
          ))
          }
        </List>
      </Collapse>
    </List>
  );
}
