import * as React from 'react';
import {
  Typography, Link
} from '@mui/material';

import ProTip from './ProTip';

import patients from './data/patients';
import images from './data/images';

import { Structure, Image } from './types';
import { PropsWithChildren } from 'react';
const patient = patients[0];
const image = images[0];


function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}.
    </Typography>
  );
}

function Canvas(props: any) {
  console.log(props);
  const image: Image = props.image;

  const canvasRef = React.useRef<HTMLCanvasElement | null>(null);

  React.useEffect(() => {
    const canvas = canvasRef?.current;
    const ctx = canvas?.getContext('2d');
    if (canvas && ctx) {
      // Background
      canvas.width = 512;
      canvas.height = 512;
      ctx.fillStyle = '#000';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Image data


      // Structures
    }
  }, []);

  return (
    <canvas ref={canvasRef} {...props} />
  );
}

export default function MainPane() {

  return (
    <>
      <Canvas
        image={image}
      />

      <Typography variant="h4" component="h1" gutterBottom>
        Create React App example with TypeScript
      </Typography>
      <ProTip />
      <Copyright />
    </>
  );
}
