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

  const expanded = [];
  if (dose.fields) {
    for (let fieldIdx = 0; fieldIdx < dose.fields.length; fieldIdx++) {
      const field = dose.fields[fieldIdx];
      expanded.push(field.id);
      for (let layerIdx = 0; layerIdx < field.layers.length; layerIdx++) {
        const layer = field.layers[layerIdx];
        expanded.push(`${field.id}-${layer.energy.toFixed(0)}`);
      }
    }
  }

  return (
    <TreeView expanded={expanded}>
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