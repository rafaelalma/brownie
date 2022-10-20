/* eslint-disable @typescript-eslint/no-misused-promises */
import express from 'express'

import dogService from '../services/dogService'
import { DogFields } from '../types/dogType'
import validateDog from '../utils/validateDog'
import DogModel from '../models/dogModel'
import middleware from '../utils/middleware'
import logger from '../utils/logger'

const router = express.Router()

router.get('/', async (_req, res, next) => {
  try {
    const dogs = await dogService.getDogs()
    return res.json(dogs)
  } catch (error) {
    return next(error)
  }
})

router.get('/:id', async (req, res, next) => {
  const id = req.params.id

  try {
    const dog = await dogService.getDog(id)

    if (dog) {
      return res.json(dog)
    } else {
      return res.status(404).end()
    }
  } catch (error) {
    return next(error)
  }
})

router.post('/', middleware.coordinatorVerifier, async (req, res, next) => {
  try {
    const validDog = validateDog(req.body as DogFields)

    const { name } = validDog

    const existingDog = await DogModel.findOne({ name })
    if (existingDog) {
      const errorMessage = 'dog name must be unique'
      logger.error(errorMessage)
      return res.status(400).json({ error: errorMessage })
    }

    const addedDog = await dogService.addDog(validDog)
    return res.status(201).json(addedDog)
  } catch (error) {
    return next(error)
  }
})

router.delete(
  '/:id',
  middleware.coordinatorVerifier,
  async (req, res, next) => {
    const id = req.params.id

    try {
      await dogService.deleteDog(id)
      return res.status(204).end()
    } catch (error) {
      return next(error)
    }
  }
)

router.put('/:id', middleware.coordinatorVerifier, async (req, res, next) => {
  const id = req.params.id

  try {
    const validDog = validateDog(req.body as DogFields)

    const { name } = validDog

    const existingDog = await DogModel.findOne({ name })
    if (existingDog && existingDog.id !== id) {
      const errorMessage = 'dog name must be unique'
      logger.error(errorMessage)
      return res.status(400).json({ error: errorMessage })
    }

    const updatedDog = await dogService.updateDog(id, validDog)
    return res.json(updatedDog)
  } catch (error) {
    return next(error)
  }
})

export default router
