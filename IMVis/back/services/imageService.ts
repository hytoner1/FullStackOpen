import images from '../data/images';

import { Image } from '../types';

let imageList = [...images];

const getImages = (): Image[] => {
  return imageList;
};

const getImage = (id: string): Image | undefined => {
  return imageList.find(x => x.id === id);
};

export default { getImages, getImage };