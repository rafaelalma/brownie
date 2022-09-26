import DogModel from '../models/dog';
import { Dog } from '../types';

const getDogs = async () => {
  const dogs: Dog[] = await DogModel.find({});
  return dogs;
};

const getDog = async (id: string) => {
  const dog: Dog | null = await DogModel.findById(id);
  return dog;
};

const addDog = async (body: Dog) => {
  const {
    name,
    kennel,
    birthDate,
    breed,
    comments,
    isSpayedOrNeutered,
    height,
    length,
    weight,
    isCatFriendly,
    size,
    youtubeUrl,
  } = body;

  const dog = new DogModel({
    dateAdded: new Date(),
    name,
    kennel,
    birthDate,
    breed,
    comments,
    isSpayedOrNeutered,
    height,
    length,
    weight,
    isCatFriendly,
    size,
    youtubeUrl,
  });

  const newDog = await dog.save();

  return newDog;
};

const deleteDog = async (id: string) => {
  return await DogModel.findByIdAndDelete(id);
};

const updateDog = async (id: string, body: Dog) => {
  const {
    name,
    kennel,
    birthDate,
    breed,
    comments,
    isSpayedOrNeutered,
    height,
    length,
    weight,
    isCatFriendly,
    size,
    youtubeUrl,
  } = body;

  const dog = {
    name,
    kennel,
    birthDate,
    breed,
    comments,
    isSpayedOrNeutered,
    height,
    length,
    weight,
    isCatFriendly,
    size,
    youtubeUrl,
  };

  const updatedDog = await DogModel.findByIdAndUpdate(id, dog, { new: true });

  return updatedDog;
};

export default {
  getDogs,
  getDog,
  addDog,
  deleteDog,
  updateDog,
};
