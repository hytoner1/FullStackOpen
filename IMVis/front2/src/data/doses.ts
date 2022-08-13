import { Dose } from '../types';

import images from './images';
const image = images[0];

function CreateInfluence(xsize: number, ysize: number,
  targetUL: [number, number], targetLR: [number, number], xDir = false) {
  const influence = new Array<[number, number]>();

  for (let i = targetUL[1]; i < targetLR[1]; i++) {
    for (let j = targetUL[0]; j < targetLR[0]; j++) {
      const idx = i * xsize + j;
      influence.push([idx, 1]);
    }
  }

  if (xDir) {
    for (let i = targetUL[1]; i < targetLR[1]; i++) {
      for (let j = 0; j < targetUL[0]; j++) {
        const idx = i * xsize + j;
        const val = 0.3 + 0.2 * j / targetUL[0];
        influence.push([idx, val]);
      }
    }
  }
  else {
    for (let i = 0; i < targetUL[1]; i++) {
      for (let j = targetUL[0]; j < targetLR[0]; j++) {
        const idx = i * xsize + j;
        const val = 0.3 + 0.2 * i / targetUL[1];
        influence.push([idx, val]);
      }
    }
  }

  return influence;
}

const doses: Dose[] = [
  {
    id: 'Dose1',

    xsize: image.xsize,
    ysize: image.ysize,
    zsize: image.zsize,

    influences: [
      CreateInfluence(image.xsize, image.ysize, [26, 26], [32, 32], false),
      CreateInfluence(image.xsize, image.ysize, [32, 26], [38, 32], false),
      CreateInfluence(image.xsize, image.ysize, [26, 32], [32, 38], false),
      CreateInfluence(image.xsize, image.ysize, [32, 32], [38, 38], false),

      CreateInfluence(image.xsize, image.ysize, [26, 26], [32, 32], true),
      CreateInfluence(image.xsize, image.ysize, [32, 26], [38, 32], true),
      CreateInfluence(image.xsize, image.ysize, [26, 32], [32, 38], true),
      CreateInfluence(image.xsize, image.ysize, [32, 32], [38, 38], true)
    ],

    weights: [.25, .25, 0.5, 0.5,
      .25, 0.5, 0.25, 0.5]
  }, // Dose1

  {
    id: 'Dose2',

    influences: [[[0, 0]]],
    weights: [0],

    xsize: image.xsize,
    ysize: image.ysize,
    zsize: image.zsize,

    fields: [
      {
        id: 'Field1',
        angle: 0,
        layers: [
          {
            energy: 200,
            spots: [
              {
                globalIdx: 0,
                influence: CreateInfluence(image.xsize, image.ysize, [26, 32], [32, 38], false),
                weight: .5
              },
              {
                globalIdx: 1,
                influence: CreateInfluence(image.xsize, image.ysize, [32, 32], [38, 38], false),
                weight: .5
              }
            ] // Spots
          },
          {
            energy: 150,
            spots: [
              {
                globalIdx: 2,
                influence: CreateInfluence(image.xsize, image.ysize, [26, 26], [32, 32], false),
                weight: .25
              },
              {
                globalIdx: 3,
                influence: CreateInfluence(image.xsize, image.ysize, [32, 26], [38, 32], false),
                weight: .25
              }
            ]  // Spots
          }
        ] 
      },
      {
        id: 'Field2',
        angle: 270,
        layers: [
          {
            energy: 200,
            spots: [
              {
                globalIdx: 4,
                influence: CreateInfluence(image.xsize, image.ysize, [26, 32], [32, 38], true),
                weight: .5
              },
              {
                globalIdx: 5,
                influence: CreateInfluence(image.xsize, image.ysize, [32, 32], [38, 38], true),
                weight: .5
              }
            ] // Spots
          },
          {
            energy: 150,
            spots: [
              {
                globalIdx: 6,
                influence: CreateInfluence(image.xsize, image.ysize, [26, 26], [32, 32], true),
                weight: .25
              },
              {
                globalIdx: 7,
                influence: CreateInfluence(image.xsize, image.ysize, [32, 26], [38, 32], true),
                weight: .25
              }
            ]  // Spots
          }
        ] // Layers 
      }
    ] // Fields
  } // Dose2
];

export default doses;