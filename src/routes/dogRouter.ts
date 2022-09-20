/* eslint-disable @typescript-eslint/no-misused-promises */
import express from 'express';
import dogService from '../services/dogService';
import { Dog } from '../types';

const router = express.Router();

router.get('/', async (_req, res, next) => {
  try {
    const dogs = await dogService.getDogs();
    res.json(dogs);
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  const body = req.body as Dog;

  try {
    const newDog = await dogService.addDog(body);
    res.json(newDog);
  } catch (error) {
    next(error);
  }
});

export default router;
