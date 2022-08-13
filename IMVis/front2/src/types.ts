export interface Patient {
  id: string;
  planIds: string[];
};

export interface Plan {
  id: string;
  image: Img;
  dose: Dose;
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

export interface Dose {
  id: string;

  xsize: number; // To convert idx in data to (x,y)
  ysize: number;
  zsize: number;

  fields?: Field[];

  influences: [number, number][][]; // [(idx, contribution)] -> all spots (nRows)
  weights: number[]; // weights times influences is dose
};

export interface Field {
  id: string;
  angle: number; // Field angle in degrees

  layers: Layer[];
};

export interface Layer {
  energy: number;
  spots: Spot[];
};

export interface Spot {
  globalIdx: number; // Unique index for each spot of a plan
  influence: [number, number][]; // list of [dose grid idx, relative contribution]
  weight: number;
};