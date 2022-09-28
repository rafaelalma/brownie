import DogModel from '../models/dog'
import { NewDog } from '../types'

const initialDogs: NewDog[] = [
  {
    name: 'Dog 1',
    kennel: 'D1',
    birthDate: '30/10',
    breed: 'Podenco',
    comments: 'sin comentarios',
    isSpayedOrNeutered: true,
    height: 60,
    length: 90,
    weight: 15,
    isCatFriendly: true,
    size: 'medium',
    youtubeUrl: '',
  },
  {
    name: 'Dog 2',
    kennel: 'D2',
    birthDate: '21/12',
    breed: 'Bodeguero',
    comments: '',
    isSpayedOrNeutered: true,
    height: 40,
    length: 50,
    weight: 12,
    isCatFriendly: true,
    size: 'medium little',
    youtubeUrl: '',
  },
]

const dogsInDb = async () => {
  const dogs = await DogModel.find({})
  return dogs.map((dog) => dog.toJSON())
}

const nonExistingId = async () => {
  const dog = new DogModel({ name: 'No Dog' })
  await dog.save()
  await dog.remove()

  return dog._id.toString()
}

export default {
  initialDogs,
  dogsInDb,
  nonExistingId,
}
