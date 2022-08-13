import * as React from 'react';
import { PropsWithChildren } from 'react';

import { Dose } from '../types';

import {
  Button, List, ListItemButton, ListItemIcon, ListItemText, Collapse, ListSubheader,
  FormControlLabel, Checkbox, Stack, Typography
} from '@mui/material';

interface SpotsPaneProps {
  weights: number[];
}
export default function SpotsPane({ weights }: PropsWithChildren<SpotsPaneProps>) {

  return (
    <List>
      {
        weights.map((weight: number, index: number) => (
          <ListItemText key={index}>
            {index}: {weight.toFixed(2)}
          </ListItemText>
        ))
      }
    </List>
  );
}