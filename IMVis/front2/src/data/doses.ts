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
        const val = 0.3 + 0.2 * (targetUL[0] - j);
        influence.push([idx, val]);
      }
    }
  }
  else {
    for (let i = 0; i < targetUL[1]; i++) {
      for (let j = targetUL[0]; j < targetLR[0]; j++) {
        const idx = i * xsize + j;
        const val = 0.3 + 0.2 * (targetUL[1] - i);
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
      //[
      //  [2, .1],
      //  [7, .3],
      //  [12, 1]
      //],
      //[
      //  [0, .1],
      //  [6, .3],
      //  [12, 1]
      // ]
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
  } // influence1
];

export default doses;