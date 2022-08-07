import { Dose } from '../types';

const doses: Dose[] = [
  {
    id: 'Dose1',

    xsize: 5,
    ysize: 5,
    zsize: 1,

    influences: [
      [
        [2, .1],
        [7, .3],
        [12, 1]
      ],
      [
        [0, .1],
        [6, .3],
        [12, 1]
      ]
    ],

    weights: [1, 0.5]
  } // influence1
];

export default doses;