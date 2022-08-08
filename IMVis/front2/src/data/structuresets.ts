import { StructureSet } from '../types';

const CreateBodyContour = (radius: number, nPoints: number, x=0, y=0) => {
  const contour: [number, number][] = new Array(nPoints);
  for (let i = 0; i < nPoints; i++) {
    const angleRad = i * 2 * Math.PI / nPoints;
    contour[i] = [radius * Math.cos(angleRad) + x,
                  radius * Math.sin(angleRad) + y];
  }

  return contour;
}

const structuresets: StructureSet[] = [
  {
    id: 'SSet1',
    structures: [
      {
        id: 'BODY',
        idx: 0,
        color: '#00BB00',
        contours: [
          CreateBodyContour(230, 230, 251, 251)
        ]
      },
      {
        id: 'Target',
        idx: 1,
        color: '#BB0000',
        contours: [
          [
            [200, 200], [300, 200], [300, 300], [200, 300]
          ]
        ]
      }
    ]
  } // structureset
];

export default structuresets;