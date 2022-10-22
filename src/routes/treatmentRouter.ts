/* eslint-disable @typescript-eslint/no-misused-promises */
import express from 'express'

import treatmentService from '../services/treatmentService'
import { TreatmentFields } from '../types/treatmentType'
import validateTreatment from '../utils/validateTreatment'
import middleware from '../utils/middleware'
import logger from '../utils/logger'
import { MISSING_TREATMENT_ERROR_MESSAGE } from '../constants/errorMessages'

const router = express.Router()

router.get('/', async (_req, res, next) => {
  try {
    const treatments = await treatmentService.getTreatments()
    return res.json(treatments)
  } catch (error) {
    return next(error)
  }
})

router.get('/:id', async (req, res, next) => {
  const id = req.params.id

  try {
    const treatment = await treatmentService.getTreatment(id)

    if (treatment) {
      return res.json(treatment)
    } else {
      logger.error(MISSING_TREATMENT_ERROR_MESSAGE)
      return res.status(404).json({ error: MISSING_TREATMENT_ERROR_MESSAGE })
    }
  } catch (error) {
    return next(error)
  }
})

router.post('/', middleware.coordinatorVerifier, async (req, res, next) => {
  try {
    const validTreatment = validateTreatment(req.body as TreatmentFields)

    const addedTreatment = await treatmentService.addTreatment(validTreatment)
    return res.status(201).json(addedTreatment)
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
      await treatmentService.deleteTreatment(id)
      return res.status(204).end()
    } catch (error) {
      return next(error)
    }
  }
)

router.put('/:id', middleware.coordinatorVerifier, async (req, res, next) => {
  const id = req.params.id

  try {
    const validTreatment = validateTreatment(req.body as TreatmentFields)

    const updatedTreatment = await treatmentService.updateTreatment(
      id,
      validTreatment
    )
    return res.json(updatedTreatment)
  } catch (error) {
    return next(error)
  }
})

export default router
