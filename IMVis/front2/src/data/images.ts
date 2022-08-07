import { Img } from '../types';

import structuresets from './structuresets';

const structureset = structuresets[0];

const images: Img[] = [
  {
    id: 'image1',

    xsize: 5,
    ysize: 5,
    zsize: 1,

    data: [
      [
        [0, 0, .25, 0, 0],
        [0, .5, 1, .5, 0],
        [.25, 1, 1, 1, .25],
        [0, .5, 1, .5, 0],
        [0, 0, .25, 0, 0]
      ]
    ],

    structureset: structureset
  } // image1
];

export default images;