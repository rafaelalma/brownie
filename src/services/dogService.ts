import DogModel from '../models/dogModel'
import { Dog, NewDog } from '../types/dogType'

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
    createTime: new Date(),
    updateTime: null,
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

  const addedDog = (await dog.save()) as Dog

  return addedDog
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
    updateTime: new Date(),
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
