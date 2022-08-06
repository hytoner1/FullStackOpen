import { Img } from '../types';

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

    structureset: {
      id: 'sset1',
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
  } // image1
];

export default images;