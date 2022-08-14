import { Img } from '../types';

import structuresets from './structuresets';

const structureset = structuresets[0];

const CreateImageArray = (xsize: number, ysize: number) => {
  const imArray: number[][] = new Array(ysize);
  for (let i = 0; i < imArray.length; i++) {
    imArray[i] = new Array(xsize).fill(0);
  }

  const halfX = Math.floor(xsize / 2);
  const halfY = Math.floor(ysize / 2);

  for (let i = 0; i < ysize; i++) {
    for (let j = 0; j < xsize; j++) {
      if (Math.pow(i - halfY, 2) + Math.pow(j - halfX, 2) > 0.8 * halfX * halfY) {
        continue;
      }

      const minusPart = ((Math.pow(i - halfY, 2) + Math.pow(j - halfX, 2)) / (halfX * halfY))
      imArray[i][j] = 1 - Math.sqrt(minusPart);
    }
  }

  return imArray;
}

const xsize1 = 64;
const ysize1 = 64;
const images: Img[] = [
  {
    id: 'image1',

    xsize: xsize1,
    ysize: ysize1,
    zsize: 1,

    data: [
      CreateImageArray(xsize1, ysize1)
    ],

    structureset: structureset
  } // image1
];

export default images;