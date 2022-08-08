import * as React from 'react';
import {
  Box
} from '@mui/material';

import { Plan, Img, Structure, Dose } from './types';
import { PropsWithChildren } from 'react';

async function drawData(imData: ImageData, ctx: CanvasRenderingContext2D) {
  const resizeWidth = 500 >> 0;
  const resizeHeight = 500 >> 0;
  const resizeQuality = 'pixelated';
  const ibm = await createImageBitmap(imData, 0, 0, imData.width, imData.height,
    { resizeWidth, resizeHeight, resizeQuality });

  ctx.drawImage(ibm, 0, 0);
}

interface ImageCanvasProps {
  image: Img;
}
function ImageCanvas({ image }: PropsWithChildren<ImageCanvasProps>) {
  const canvasRef = React.useRef<HTMLCanvasElement | null>(null);

  React.useEffect(() => {
    const canvas = canvasRef?.current;
    const ctx = canvas?.getContext('2d');
    if (canvas && ctx) {
      canvas.width = 500;
      canvas.height = 500;

      const imData = ctx.createImageData(image.xsize, image.ysize);
      for (let i = 0; i < imData.height; i++) {
        for (let j = 0; j < imData.width; j++) {
          const idx = imData.width * (i * 4) + (j * 4);

          imData.data[idx + 0] = image.data[0][i][j] * 255;
          imData.data[idx + 1] = image.data[0][i][j] * 255;
          imData.data[idx + 2] = image.data[0][i][j] * 255;
          imData.data[idx + 3] = 255; // alpha
        }
      }

      drawData(imData, ctx);
      //ctx.putImageData(imData, 0, 0);
    }
  }, []);

  return (
    <canvas ref={canvasRef} />
  );
}

interface DoseCanvasProps {
  dose: Dose;
}
function DoseCanvas({ dose }: PropsWithChildren<DoseCanvasProps>) {
  const canvasRef = React.useRef<HTMLCanvasElement | null>(null);

  React.useEffect(() => {
    const canvas = canvasRef?.current;
    const ctx = canvas?.getContext('2d');
    if (canvas && ctx) {
      canvas.width = 500;
      canvas.height = 500;

      const doseData: number[] = new Array(dose.ysize * dose.xsize).fill(0);
      const nonZeroIdx = new Set<number>();
      let maxVal = 0;
      for (let spotIdx = 0; spotIdx < dose.weights.length; spotIdx++) {
        for (let i = 0; i < dose.influences[spotIdx].length; i++) {
          doseData[dose.influences[spotIdx][i][0]] += dose.influences[spotIdx][i][1] * dose.weights[spotIdx];
          nonZeroIdx.add(dose.influences[spotIdx][i][0]);
          if (doseData[dose.influences[spotIdx][i][0]] > maxVal) {
            maxVal = doseData[dose.influences[spotIdx][i][0]];
          }
        }
      }

      const imData = ctx.createImageData(dose.xsize, dose.ysize);
      nonZeroIdx.forEach((idx) => {
        imData.data[idx * 4 + 2] = doseData[idx] / maxVal * 255;
        imData.data[idx * 4 + 3] = 255; // alpha
      });

      drawData(imData, ctx);
    }
  }, []);

  return (
    <canvas ref={canvasRef} />
  );
}

function StructureCanvas({ structures, checkedList }:
  { structures: Structure[]; checkedList: boolean[] }
) {
  const canvasRef = React.useRef<HTMLCanvasElement | null>(null);

  React.useEffect(() => {
    const canvas = canvasRef?.current;
    const ctx = canvas?.getContext('2d');
    if (canvas && ctx) {
      canvas.width = 500;
      canvas.height = 500;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let structureIdx = 0; structureIdx < structures.length; structureIdx++) {
        if (!checkedList[structureIdx]) {
          continue;
        }
        const structure = structures[structureIdx];

        ctx.strokeStyle = structure.color;
        ctx.beginPath();
        for (let i = 0; i < structure.contours.length; i++) {
          ctx.moveTo(structure.contours[i][0][0], structure.contours[i][0][1]);
          for (let j = 1; j < structure.contours[i].length; j++) {
            ctx.lineTo(structure.contours[i][j][0], structure.contours[i][j][1]);
          }
          ctx.lineTo(structure.contours[i][0][0], structure.contours[i][0][1]);
        }
        ctx.stroke();
      }

    }
  }, [checkedList]);

  return (
    <canvas ref={canvasRef} />
  );
}

interface MainPaneProps {
  plan: Plan; checkedList: boolean[]
}
export default function MainPane({ plan, checkedList }: PropsWithChildren<MainPaneProps>) {
  return (
    <Box>
      <ImageCanvas image={plan.image} />
      <Box sx={{ m: '0', p: '0', mt: '-506px' }}>
        <DoseCanvas dose={plan.dose} />
      </Box>
      <Box sx={{ m: '0', p: '0', mt: '-506px' }}>
        <StructureCanvas structures={plan.image.structureset.structures}
          checkedList={checkedList}
        />
      </Box>
    </Box>
  );
}
