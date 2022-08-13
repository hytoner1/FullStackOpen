import * as React from 'react';
import { PropsWithChildren } from 'react';

import { Dose, Field, Layer, Spot } from '../types';

import {
  Button, List, ListItemButton, ListItemIcon, ListItemText, Collapse, ListSubheader,
  FormControlLabel, Checkbox, Stack, Typography
} from '@mui/material';
import TreeView from '@mui/lab/TreeView';
import TreeItem, { TreeItemProps, treeItemClasses } from '@mui/lab/TreeItem';


interface SpotsPaneProps {
  weights: number[];
  dose?: Dose;
}
export default function SpotsPane({ weights, dose }:
  PropsWithChildren<SpotsPaneProps>) {
  if (!dose) {
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

  return (
    <TreeView>
      {
        dose.fields?.map((field: Field) => (
          <TreeItem
            key={field.id}
            nodeId={field.id}
            label={field.id}>
            {
              field.layers.map((layer: Layer) => (
                <TreeItem
                  key={`${field.id}-${layer.energy.toFixed(0)}`}
                  nodeId={`${field.id}-${layer.energy.toFixed(0)}`}
                  label={`${layer.energy.toFixed(0)} MeV`}
                >
                  {
                    layer.spots.map((spot: Spot) => (
                      <TreeItem
                        key={`${field.id}-${layer.energy.toFixed(0)}-${spot.globalIdx}`}
                        nodeId={`${field.id}-${layer.energy.toFixed(0)}-${spot.globalIdx}`}
                        label={`${spot.globalIdx}: ${weights[spot.globalIdx].toFixed(2)}`}
                      />
                    ))
                  }
                </TreeItem>
              ))
            }
          </TreeItem>
        ))
      }
    </TreeView>
  );
}