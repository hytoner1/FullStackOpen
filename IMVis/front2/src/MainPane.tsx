import * as React from 'react';
import {
  Box
} from '@mui/material';

import { Structure, Img, Influence } from './types';
import { PropsWithChildren } from 'react';

async function drawData(imData: ImageData, ctx: CanvasRenderingContext2D) {
  const resizeWidth = 500 >> 0;
  const resizeHeight = 500 >> 0;
  const ibm = await createImageBitmap(imData, 0, 0, imData.width, imData.height,
    { resizeWidth, resizeHeight });

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
    }
  }, []);

  return (
    <canvas ref={canvasRef} />
  );
}

interface DoseCanvasProps {
  influence: Influence;
}
function DoseCanvas({ influence }: PropsWithChildren<DoseCanvasProps>) {
  const canvasRef = React.useRef<HTMLCanvasElement | null>(null);

  React.useEffect(() => {
    const canvas = canvasRef?.current;
    const ctx = canvas?.getContext('2d');
    if (canvas && ctx) {
      canvas.width = 500;
      canvas.height = 500;

      const doseData: number[] = new Array(influence.ysize * influence.xsize).fill(0);
      const nonZeroIdx = new Set<number>();
      let maxVal = 0;
      for (let spotIdx = 0; spotIdx < influence.weights.length; spotIdx++) {
        for (let i = 0; i < influence.data[spotIdx].length; i++) {
          console.log(`${spotIdx}, ${i}, ${influence.data[spotIdx][i][1] * influence.weights[spotIdx]}`);

          doseData[influence.data[spotIdx][i][0]] += influence.data[spotIdx][i][1] * influence.weights[spotIdx];
          nonZeroIdx.add(influence.data[spotIdx][i][0]);
          if (doseData[influence.data[spotIdx][i][0]] > maxVal) {
            maxVal = doseData[influence.data[spotIdx][i][0]];
          }
        }
      }

      const imData = ctx.createImageData(influence.xsize, influence.ysize);
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
  image: Img; checkedList: boolean[]; influence: Influence;
}
export default function MainPane({ image, checkedList, influence }: PropsWithChildren<MainPaneProps>) {
  return (
    <Box>
      <ImageCanvas image={image} />
      <Box sx={{ m: '0', p: '0', mt: '-506px' }}>
        <DoseCanvas influence={influence} />
      </Box>
      <Box sx={{ m: '0', p: '0', mt: '-506px' }}>
        <StructureCanvas structures={image.structureset.structures}
          checkedList={checkedList}
        />
      </Box>
    </Box>
  );
}
