import DogModel from '../models/dogModel'
import { Dog, NewDog } from '../types/dog'

const getDogs = async () => {
  const dogs: Dog[] = await DogModel.find({})
  return dogs
}

const getDog = async (id: string) => {
  const dog: Dog | null = await DogModel.findById(id)
  return dog
}

const addDog = async (body: NewDog) => {
  const {
    name,
    kennel,
    birthDate,
    breed,
    sex,
    comments,
    isSpayedOrNeutered,
    height,
    length,
    weight,
    isCatFriendly,
    size,
    youtubeUrl,
  } = body

  const dog = new DogModel({
    dateAdded: new Date(),
    name,
    kennel,
    birthDate,
    breed,
    sex,
    comments,
    isSpayedOrNeutered,
    height,
    length,
    weight,
    isCatFriendly,
    size,
    youtubeUrl,
  })

  const newDog = (await dog.save()) as Dog

  return newDog
}

const deleteDog = async (id: string) => {
  return await DogModel.findByIdAndDelete(id)
}

const updateDog = async (id: string, body: NewDog) => {
  const {
    name,
    kennel,
    birthDate,
    breed,
    sex,
    comments,
    isSpayedOrNeutered,
    height,
    length,
    weight,
    isCatFriendly,
    size,
    youtubeUrl,
  } = body

  const dog = {
    name,
    kennel,
    birthDate,
    breed,
    sex,
    comments,
    isSpayedOrNeutered,
    height,
    length,
    weight,
    isCatFriendly,
    size,
    youtubeUrl,
  }

  const updatedDog = (await DogModel.findByIdAndUpdate(id, dog, {
    new: true,
  })) as Dog

  return updatedDog
}

export default {
  getDogs,
  getDog,
  addDog,
  deleteDog,
  updateDog,
}
