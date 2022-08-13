import * as React from 'react';
import {
  Box, Tooltip, Typography
} from '@mui/material';

import { Plan, Img, Structure, Dose } from '../types';
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
    }
  }, [image]);

  return (
    <canvas ref={canvasRef} />
  );
}

interface DoseCanvasProps {
  dose: Dose;
  setDoseData: React.Dispatch<React.SetStateAction<number[]>>;
  weights: number[];
  influences: [number, number][][]
}
function DoseCanvas({ dose, setDoseData, weights, influences }:
  PropsWithChildren<DoseCanvasProps>) {
  const canvasRef = React.useRef<HTMLCanvasElement | null>(null);

  React.useEffect(() => {
    const canvas = canvasRef?.current;
    const ctx = canvas?.getContext('2d');
    if (canvas && ctx) {
      canvas.width = 500;
      canvas.height = 500;

      const tmpDoseData = new Array(dose.xsize * dose.ysize).fill(0);
      const nonZeroIdx = new Set<number>();
      let maxVal = 0;
      for (let spotIdx = 0; spotIdx < weights.length; spotIdx++) {
        if (weights[spotIdx] <= 0.01) {
          continue;
        }

        for (let i = 0; i < influences[spotIdx].length; i++) {
          tmpDoseData[influences[spotIdx][i][0]] += influences[spotIdx][i][1] * weights[spotIdx];
          nonZeroIdx.add(influences[spotIdx][i][0]);
          if (tmpDoseData[influences[spotIdx][i][0]] > maxVal) {
            maxVal = tmpDoseData[influences[spotIdx][i][0]];
          }
        }
      }

      const imData = ctx.createImageData(dose.xsize, dose.ysize);
      nonZeroIdx.forEach((idx) => {
        imData.data[idx * 4 + 0] = tmpDoseData[idx] / maxVal * 255;
        imData.data[idx * 4 + 1] = 50;//255 - doseData[idx] / maxVal * 255;
        imData.data[idx * 4 + 2] = 255 - tmpDoseData[idx] / maxVal * 255;
        imData.data[idx * 4 + 3] = 255; // alpha
      });

      setDoseData(tmpDoseData);
      drawData(imData, ctx);
    }
  }, [dose, weights]);

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
  }, [checkedList, structures]);

  return (
    <canvas ref={canvasRef} />
  );
}

interface MainPaneProps {
  plan: Plan; checkedList: boolean[];
  weights: number[]; setWeights: React.Dispatch<React.SetStateAction<number[]>>;
  influences: [number, number][][];
}
export default function MainPane({ plan, checkedList, weights, setWeights, influences }:
  PropsWithChildren<MainPaneProps>) {
  const [coords, setCoords] = React.useState([-1, -1]); // XY coords for mouse on canvas. Negatives ignored.
  const [doseData, setDoseData] = React.useState( // array of dose values
    new Array(plan.dose.ysize * plan.dose.xsize).fill(0));

  const handleMouseMove = (event: any) => {
    event.preventDefault();

    let tmpX = Math.floor((event.clientX - event.target.offsetLeft) * plan.image.xsize / 500);
    let tmpY = Math.floor((event.clientY - event.target.offsetTop) * plan.image.ysize / 500);

    if (tmpX < 0 || tmpX >= plan.image.xsize) {
      tmpX = -1;
    }

    if (tmpY < 0 || tmpY >= plan.image.ysize) {
      tmpY = -1;
    }

    setCoords([tmpX, tmpY]);
  }

  const handleClick = (event: any) => {
    event.preventDefault();

    // Find where was clicked
    const tmpX = Math.floor((event.clientX - event.target.offsetLeft) * plan.image.xsize / 500);
    const tmpY = Math.floor((event.clientY - event.target.offsetTop) * plan.image.ysize / 500);
    const pixelIdx = tmpY * plan.image.xsize + tmpX;

    if (event.ctrlKey) {
      console.log("ctrl click", tmpX, tmpY);
    }
    else {
      console.log("click", tmpX, tmpY);
    }

    // Find the affected spots
    const affectedSpots: [number, number][] = []; // Spot idx, contribution
    for (let spotIdx = 0; spotIdx < influences.length; spotIdx++) {
      for (let idx = 0; idx < influences[spotIdx].length; idx++) {
        if (influences[spotIdx][idx][0] === pixelIdx) {
          affectedSpots.push([spotIdx, influences[spotIdx][idx][1]]);
          break;
        }
      }
    }

    console.log(affectedSpots);

    const sumOfInfluences = affectedSpots.reduce((tmpSum, x) => tmpSum + x[1], 0);
    console.log(sumOfInfluences);

    const tmpWeights = [...weights];
    const changeAmount = 0.1;
    affectedSpots.forEach((x) => {
      tmpWeights[x[0]] += changeAmount * x[1] / sumOfInfluences * Math.pow(-1, event.ctrlKey);
    });

    setWeights(tmpWeights);
  }

  return (
    <Tooltip
      title={
        coords[0] >= 0 && coords[1] >= 0 &&
        <Typography>
          {`(x,y): (${coords[0]},${coords[1]})`}
          <br />
          {`${plan.image.data[0][coords[0]][coords[1]].toFixed(1)} HU`}
          <br />
          {`${doseData[coords[0] + plan.dose.xsize * coords[1]].toFixed(2)} Gy`
          }
        </Typography>
      }

      followCursor={true} >
      <div onMouseMove={handleMouseMove} onClick={handleClick}>
        <ImageCanvas image={plan.image} />

        <Box sx={{ m: '0', p: '0', mt: '-506px' }}>
          <DoseCanvas
            dose={plan.dose}
            setDoseData={setDoseData}
            weights={weights}
            influences={influences}
          />
        </Box>

        <Box sx={{ m: '0', p: '0', mt: '-506px' }}>
          <StructureCanvas structures={plan.image.structureset.structures}
            checkedList={checkedList}
          />
        </Box>
      </div>
    </Tooltip>
  );
}
