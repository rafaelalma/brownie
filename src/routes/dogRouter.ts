/* eslint-disable @typescript-eslint/no-misused-promises */
import express from 'express'
import dogService from '../services/dogService'
import { Dog } from '../types'

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
  const body = req.body as Dog

  const { name } = body

  if (!name) {
    return res.status(400).json({ error: 'dog must have a name' })
  }

  try {
    const newDog = await dogService.addDog(body)
    return res.status(201).json(newDog)
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
