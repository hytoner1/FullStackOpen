import { Patient } from '../types';

const patients: Patient[] = [
  {
    id: 'patient1',
    image: {
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
            color: [1, 1, 1],
            contours: [
              [
                [0, 0], [0, 1], [1, 1]
              ]
            ]
          }
        ]
      } // structureset
    } // image
  }

];

export default patients;