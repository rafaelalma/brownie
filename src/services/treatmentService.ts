import TreatmentModel from '../models/treatmentModel'
import { Treatment, NewTreatment } from '../types/treatmentType'
import DogModel from '../models/dogModel'

const getTreatments = async () => {
  const treatments: Treatment[] = await TreatmentModel.find({}).populate(
    'dog',
    { name: 1, kennel: 1 }
  )
  return treatments
}

const getTreatment = async (id: string) => {
  const treatment: Treatment | null = await TreatmentModel.findById(id)
  return treatment
}

const addTreatment = async (body: NewTreatment) => {
  const { parts, dogId } = body

  const dog = await DogModel.findById(dogId)

  if (!dog) {
    const errorMessage = 'incorrect or missing dog for treatment'
    const missingDogError = new Error(errorMessage)
    missingDogError.name = 'MissingDogError'
    throw missingDogError
  }

  const treatment = new TreatmentModel({
    createTime: new Date(),
    updateTime: null,
    parts,
    dog: dog._id,
  })

  const addedTreatment = await treatment.save()

  return addedTreatment
}

const deleteTreatment = async (id: string) => {
  return await TreatmentModel.findByIdAndDelete(id)
}

const updateTreatment = async (id: string, body: NewTreatment) => {
  const { parts, dogId } = body

  const dog = await DogModel.findById(dogId)

  if (!dog) {
    const errorMessage = 'incorrect or missing dog for treatment'
    const missingDogError = new Error(errorMessage)
    throw missingDogError
  }

  const treatment = {
    updateTime: new Date(),
    parts,
    dog: dog._id,
  }

  const updatedTreament = (await TreatmentModel.findByIdAndUpdate(
    id,
    treatment,
    { new: true }
  )) as Treatment

  return updatedTreament
}

export default {
  getTreatments,
  getTreatment,
  addTreatment,
  deleteTreatment,
  updateTreatment,
}
