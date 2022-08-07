import { StructureSet } from '../types';

const structuresets: StructureSet[] = [
  {
    id: 'SSet1',
    structures: [
      {
        id: 'structure1',
        idx: 0,
        color: '#C555A1',
        contours: [
          [
            [0, 0], [500, 500], [400, 100]
          ]
        ]
      },
      {
        id: 'structure2',
        idx: 1,
        color: '#A5A511',
        contours: [
          [
            [500, 0], [0, 500], [100, 100]
          ]
        ]
      }
    ]
  } // structureset
];

export default structuresets;