export interface Patient {
  id: string;
  imageIds?: string[];
};

export interface Img {
  id: string;

  xsize: number;
  ysize: number;
  zsize: number;

  data: number[][][];

  structureset: StructureSet;
};

export interface StructureSet {
  id: string;
  structures: Structure[];
};

export interface Structure {
  id: string;
  idx: number;
  color: string; // #Hex123
  contours: [number, number][][]; // (x,y) -> layer -> all layers
};

export interface Influence {
  id: string;

  xsize: number; // To convert idx in data to (x,y)
  ysize: number;
  zsize: number;

  data: [number, number][][]; // [(idx, contribution)] -> all spots (nRows)
  weights: number[]; // weights times influences is dose
}