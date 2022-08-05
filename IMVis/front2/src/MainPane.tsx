import * as React from 'react';
import {
  Box
} from '@mui/material';

import ProTip from './ProTip';

import patients from './data/patients';
import images from './data/images';

import { Structure, Img } from './types';
const patient = patients[0];
const image = images[0];


async function drawData(imData: ImageData, ctx: CanvasRenderingContext2D) {
  const resizeWidth = 500 >> 0;
  const resizeHeight = 500 >> 0;
  const ibm = await createImageBitmap(imData, 0, 0, imData.width, imData.height,
    { resizeWidth, resizeHeight });

  ctx.drawImage(ibm, 0, 0);
}

function ImageCanvas(props: any) {
  const image: Img = props.image;

  const canvasRef = React.useRef<HTMLCanvasElement | null>(null);

  const styles = {
    position: 'absolute'
  };

  React.useEffect(() => {
    const canvas = canvasRef?.current;
    const ctx = canvas?.getContext('2d');
    if (canvas && ctx) {
      canvas.width = 500;
      canvas.height = 500;

      let imData = ctx.createImageData(image.xsize, image.ysize);
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
    <canvas ref={canvasRef} {...props} style={styles} />
  );
}

function StructureCanvas(props: any) {
  const structures: Structure[] = props.structures;

  const canvasRef = React.useRef<HTMLCanvasElement | null>(null);

  const styles = {
    position: 'absolute'
  };

  React.useEffect(() => {
    const canvas = canvasRef?.current;
    const ctx = canvas?.getContext('2d');
    if (canvas && ctx) {
      canvas.width = 500;
      canvas.height = 500;

      for (let structureIdx = 0; structureIdx < structures.length; structureIdx++) {
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
  }, []);

  return (
    <canvas ref={canvasRef} {...props} style={styles} />
  );
}

export default function MainPane() {

  return (
    <Box>
      <p style={{ position: 'relative' }}>
        <ImageCanvas image={image} />
        <StructureCanvas structures={image.structureset.structures} />
      </p>
    </Box>
  );
}
