export interface Patient {
  id: string;
  imageIds?: string[];
};

export interface Image {
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
  color: string; // #Hex123
  contours: [number, number][][]; // (x,y) -> layer -> all layers
};

