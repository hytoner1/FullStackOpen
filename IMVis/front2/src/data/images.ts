import { Image } from '../types';

const images: Image[] = [
  {
    id: 'image1',

    xsize: 5,
    ysize: 5,
    zsize: 1,

    data: [
      [
        [0, 0, 1, 0, 0],
        [0, 1, 1, 1, 0],
        [1, 1, 1, 1, 1],
        [0, 1, 1, 1, 0],
        [0, 0, 1, 0, 0]
      ]
    ],

    structureset: {
      id: 'sset1',
      structures: [
        {
          id: 'structure1',
          color: '#C5FFA1',
          contours: [
            [
              [0, 0], [0, 1], [1, 1]
            ]
          ]
        }
      ]
    } // structureset
  } // image1
];

export default images;