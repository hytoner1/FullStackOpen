import express from 'express';
const router = express.Router();

import imageService from '../services/imageService';

router.get('/', (_req, res) => {
  const images = imageService.getImages()
  res.send(images);
});

router.get('/:id', (req, res) => {
  const image = imageService.getImage(req.params.id);
  image ? res.send(image) : res.status(404).end();
});

export default router;