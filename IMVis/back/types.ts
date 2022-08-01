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

  structureset?: StructureSet;
};

export interface StructureSet {
  id: string;
  structures: Structure[];
};

export interface Structure {
  id: string;
  color: [number, number, number]; // RGB
  contours: [number, number][][]; // (x,y) -> layer -> all layers
};

