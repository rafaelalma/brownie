/* eslint-disable @typescript-eslint/no-misused-promises */
import express from 'express'

import dogService from '../services/dogService'
import { Dog, DogFields } from '../types/dog'
import toNewDog from '../utils/toNewDog'
import DogModel from '../models/dogModel'

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

router.post('/', async (req, res, next) => {
  try {
    const newDog = toNewDog(req.body as DogFields)

    const { name } = newDog

    const existingDog = await DogModel.findOne({ name })
    if (existingDog) {
      return res.status(400).json({ error: 'dog name must be unique' })
    }

    const addedDog = await dogService.addDog(newDog)
    return res.status(201).json(addedDog)
  } catch (error) {
    return next(error)
  }
})

router.delete('/:id', async (req, res, next) => {
  const id = req.params.id

  try {
    await dogService.deleteDog(id)
    return res.status(204).end()
  } catch (error) {
    return next(error)
  }
})

router.put('/:id', async (req, res, next) => {
  const id = req.params.id
  const body = req.body as Dog

  try {
    const updatedDog = await dogService.updateDog(id, body)
    return res.json(updatedDog)
  } catch (error) {
    return next(error)
  }
})

export default router
