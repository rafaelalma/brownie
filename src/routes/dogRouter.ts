/* eslint-disable @typescript-eslint/no-misused-promises */
import express from 'express'
import dogService from '../services/dogService'
import { Dog } from '../types'

const router = express.Router()

router.get('/', async (_req, res, next) => {
  try {
    const dogs = await dogService.getDogs()
    res.json(dogs)
  } catch (error) {
    next(error)
  }
})

router.get('/:id', async (req, res, next) => {
  const id = req.params.id

  try {
    const dog = await dogService.getDog(id)

    if (dog) {
      res.json(dog)
    } else {
      res.status(404).end()
    }
  } catch (error) {
    next(error)
  }
})

router.post('/', async (req, res, next) => {
  const body = req.body as Dog

  try {
    const newDog = await dogService.addDog(body)
    res.status(201).json(newDog)
  } catch (error) {
    next(error)
  }
})

router.delete('/:id', async (req, res, next) => {
  const id = req.params.id

  try {
    await dogService.deleteDog(id)
    res.status(204).end()
  } catch (error) {
    next(error)
  }
})

router.put('/:id', async (req, res, next) => {
  const id = req.params.id
  const body = req.body as Dog

  try {
    const updatedDog = await dogService.updateDog(id, body)
    res.json(updatedDog)
  } catch (error) {
    next(error)
  }
})

export default router
