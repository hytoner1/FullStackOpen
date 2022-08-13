import * as React from 'react';
import { PropsWithChildren } from 'react';

import {
  Button, Box, List, ListItemButton, ListItemIcon, ListItemText, Collapse, ListSubheader,
  FormControlLabel, Checkbox, Stack, Typography
} from '@mui/material';

import PersonIcon from '@mui/icons-material/Person';
import CollectionsIcon from '@mui/icons-material/Collections';
import InterestsIcon from '@mui/icons-material/Interests';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import PolylineOutlinedIcon from '@mui/icons-material/PolylineOutlined';
import FlareIcon from '@mui/icons-material/Flare';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

import { Structure, Patient, Plan, Dose, Field } from '../types';


interface StructureSetHeaderProps {
  id: string;
  checkedList: boolean[];
  setCheckedList: React.Dispatch<React.SetStateAction<boolean[]>>;
  structureListOpen: boolean;
  setStructureListOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
const StructureSetHeader = ({
  id, checkedList, setCheckedList, structureListOpen, setStructureListOpen }:
  PropsWithChildren<StructureSetHeaderProps>) => {

  const handleChangeStructureSetCheckbox = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newList = new Array(checkedList.length).fill(event.target.checked);
    setCheckedList(newList);
  };

  return (
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
            onChange={handleChangeStructureSetCheckbox}
          />
        }
        sx={{ ml: 3 }}
      />
      <ListItemButton
        onClick={() => {}}
        sx={{ ml: -2 }}
      >
        <ListItemText primary={id}
          sx={{ ml: -2 }}
        />
      </ListItemButton>
      <ListItemButton onClick={() => setStructureListOpen(!structureListOpen)} >
        {structureListOpen ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
    </Stack>
  );
}

interface StructureListProps {
  structures: Structure[];
  checkedList: boolean[];
  setCheckedList: React.Dispatch<React.SetStateAction<boolean[]>>;
  structureListOpen: boolean;
}
const StructureList = ({
  structures, checkedList, setCheckedList, structureListOpen }:
  PropsWithChildren<StructureListProps>) => {

  const handleChangeStructureCheckbox = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newList = [...checkedList];
    newList[parseInt(event.target.name)] = event.target.checked;
    setCheckedList(newList);
  };

  return (
    <Collapse in={structureListOpen} timeout="auto" unmountOnExit>
      <List component="div" disablePadding>
        {structures.map((structure: Structure) => (
          <Stack
            key={structure.id}
            direction="row"
            justifyContent="center"
            alignItems="center"
            spacing={0}
          >
            <Checkbox
              checked={checkedList[structure.idx]}
              onChange={handleChangeStructureCheckbox}
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
  );
}

interface DoseListProps {
  dose: Dose;
}
const DoseList = ({ dose }: PropsWithChildren<DoseListProps>) => {
  const [fieldListOpen, setFieldListOpen] = React.useState(true);

  return (
    <Box>
      <Stack
        direction="row"
        justifyContent="center"
        alignItems="center"
        spacing={0}
      >
        <ListItemButton
          onClick={() => {}}
          sx={{ ml: 0 }}
        >
          <FormControlLabel label=''
            control={
              <FlareIcon />
            }
            sx={{ ml: 2 }}
          />
          <ListItemText primary={dose.id}
            sx={{ ml: -1 }}
          />
        </ListItemButton>
        <ListItemButton onClick={() => setFieldListOpen(!fieldListOpen)} >
          {fieldListOpen ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
      </Stack>

      {/*Fields*/}
      <Collapse in={fieldListOpen} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {dose.fields?.map((field: Field) => (
            <Stack
              key={field.id}
              direction="row"
              justifyContent="center"
              alignItems="center"
              spacing={0}
            >

              <ListItemButton>
                <ListItemIcon sx={{ ml: 5, mr: -3 }}>
                  <ArrowForwardIosIcon sx={{ ml: -1, mr: 3, rotate: `${field.angle-90}deg` }} />
                </ListItemIcon>
                <ListItemText primary={field.id} />
              </ListItemButton>
            </Stack>
          ))
          }
        </List>
      </Collapse>
    </Box>
  );
}

interface ContextPaneProps {
  patient: Patient;
  plan: Plan;
  checkedList: boolean[];
  setCheckedList: React.Dispatch<React.SetStateAction<boolean[]>>;
}
export default function ContextPane({ patient, plan, checkedList, setCheckedList }: PropsWithChildren<ContextPaneProps>) {
  const [structureListOpen, setStructureListOpen] = React.useState(true);

  return (
    <List
      sx={{ width: '100%', maxWidth: 200 }}
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader component="div" id="nested-list-subheader">
          <Stack
            direction='row'
            justifyContent="left"
            alignItems="center"
            spacing={1}
          >
            <PersonIcon fontSize='large' />
            <Typography variant='h5'>
              {patient.id}
            </Typography>
          </Stack>
        </ListSubheader>
      }
    >
      {/*Plan*/}
      <ListItemButton>
        <ListItemIcon sx={{ ml: 0, mr: -3 }}>
          <PolylineOutlinedIcon />
        </ListItemIcon>
        <ListItemText primary={plan.id} />
      </ListItemButton>

      {/*Image*/}
      <ListItemButton>
        <ListItemIcon sx={{ ml: 2, mr: -3 }}>
          <CollectionsIcon />
        </ListItemIcon>
        <ListItemText primary={plan.image.id} />
      </ListItemButton>

      {/*Structureset*/}
      <StructureSetHeader
        id={plan.image.structureset?.id}
        checkedList={checkedList}
        setCheckedList={setCheckedList}
        structureListOpen={structureListOpen}
        setStructureListOpen={setStructureListOpen}
      />

      {/*Structures*/}
      <StructureList
        structures={plan.image.structureset?.structures}
        checkedList={checkedList}
        setCheckedList={setCheckedList}
        structureListOpen={structureListOpen}
      />

      {/*Dose*/}
      <DoseList dose={plan.dose} />

    </List>
  );
}
