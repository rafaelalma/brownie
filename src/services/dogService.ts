import DogModel from '../models/dog';
import { Dog } from '../types';

const getDogs = async () => {
  const dogs: Dog[] = await DogModel.find({});
  return dogs;
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

export default {
  getDogs,
  addDog,
};
