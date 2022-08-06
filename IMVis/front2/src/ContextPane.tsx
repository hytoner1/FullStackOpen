import * as React from 'react';
import {
  List, ListItemButton, ListItemIcon, ListItemText, Collapse, ListSubheader,
  FormControlLabel, Checkbox, Stack
} from '@mui/material';

import PersonIcon from '@mui/icons-material/Person';
import CollectionsIcon from '@mui/icons-material/Collections';
import InterestsIcon from '@mui/icons-material/Interests';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

import patients from './data/patients';
import images from './data/images';

import { Structure, Patient, Img } from './types';

function renderStructure(structure: Structure,
  onChange: (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => void) {
  return (
    <ListItemButton key={structure.id}>
      <ListItemIcon sx={{ ml: 4, mr: -3, color: structure.color }}>
        <FormControlLabel
          label=''
          control={<Checkbox checked={false} onChange={onChange} />}
        />
        <CollectionsIcon sx={{ ml: -1, mr: 3, mt: 1 }} />
      </ListItemIcon>
      <ListItemText primary={structure.id} />
    </ListItemButton>
  );
}

export default function ContextPane(
  { patient, image, checkedList, setCheckedList }:
  {
      patient: Patient; image: Img;
      checkedList: boolean[]; setCheckedList: React.Dispatch<React.SetStateAction<boolean[]>>
  }
) {
  const [structureListOpen, setStructureListOpen] = React.useState(true);

  const handleClick_openStructureList = () => {
    setStructureListOpen(!structureListOpen);
  };

  const handleChange_structureSetCheckbox = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newList = new Array(checkedList.length).fill(event.target.checked);
    setCheckedList(newList);
  };

  const handleChange_structureCheckbox = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newList = [...checkedList];
    newList[parseInt(event.target.name)] = event.target.checked;
    setCheckedList(newList);
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
      {/*Patient*/}
      <ListItemButton>
        <ListItemIcon sx={{ ml: 0, mr: -3 }}>
          <PersonIcon />
        </ListItemIcon>
        <ListItemText primary={patient.id} />
      </ListItemButton>

      {/*Image*/}
      <ListItemButton>
        <ListItemIcon sx={{ ml: 2, mr: -3 }}>
          <CollectionsIcon />
        </ListItemIcon>
        <ListItemText primary={image.id} />
      </ListItemButton>

      {/*Structureset*/}
      <Stack
        direction="row"
        justifyContent="center"
        alignItems="center"
        spacing={0}
      >
        <FormControlLabel label=''
          control={
            <Checkbox
              checked={checkedList.every((x: boolean) => x === true)}
              indeterminate={!checkedList.every((x: boolean) => x === true) && !checkedList.every((x: boolean) => x === false)}
              onChange={handleChange_structureSetCheckbox}
            />
          }
          sx={{ ml: 3 }}
        />
        <ListItemButton
          onClick={() => {}}
          sx={{ ml: -2 }}
        >
          <ListItemText primary={image.structureset?.id}
            sx={{ ml: -2 }}
          />
        </ListItemButton>
        <ListItemButton onClick={handleClick_openStructureList} >
          {structureListOpen ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
      </Stack>

      {/*Structures*/}
      <Collapse in={structureListOpen} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {image.structureset.structures.map((structure: Structure) => (
            <Stack
              key={structure.id}
              direction="row"
              justifyContent="center"
              alignItems="center"
              spacing={0}
            >
              <Checkbox
                checked={checkedList[structure.idx]}
                onChange={handleChange_structureCheckbox}
                name={`${structure.idx}`}
                sx={{ ml: 5 }}
              />

              <ListItemButton>
                <ListItemIcon sx={{ ml: 0, mr: -3, color: structure.color }}>
                  <CollectionsIcon sx={{ ml: -1, mr: 3, mt: 1 }} />
                </ListItemIcon>
                <ListItemText primary={structure.id} />
              </ListItemButton>
            </Stack>
          ))
          }
        </List>
      </Collapse>
    </List>
  );
}
