import * as React from 'react';
import {
  Box
} from '@mui/material';

import { Structure, Img } from './types';

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

  //const styles = {
  //  position: 'absolute'
  //};

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
    <canvas ref={canvasRef} {...props} />// style={styles} />
  );
}

function StructureCanvas(props: any) {
  const structures: Structure[] = props.structures;

  const canvasRef = React.useRef<HTMLCanvasElement | null>(null);

  React.useEffect(() => {
    const canvas = canvasRef?.current;
    const ctx = canvas?.getContext('2d');
    if (canvas && ctx) {
      canvas.width = 500;
      canvas.height = 500;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let structureIdx = 0; structureIdx < structures.length; structureIdx++) {
        if (!props.checkedList[structureIdx]) {
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
  }, [props.checkedList]);

  return (
    <canvas ref={canvasRef} {...props} />
  );
}

export default function MainPane({ image, checkedList }:
  { image: Img; checkedList: boolean[] }) {

  return (
    <Box>
      <ImageCanvas image={image} margin={0}/>
      <Box sx={{m: '0', p: '0', mt: '-506px'}}>
        <StructureCanvas structures={image.structureset.structures}
          checkedList={checkedList}
        />
      </Box>
    </Box>
  );
}
