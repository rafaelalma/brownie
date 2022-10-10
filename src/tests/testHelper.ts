import DogModel from '../models/dogModel'
import UserModel from '../models/userModel'
import { NewDog, Sex, Size } from '../types/dog'

const initialDogs: NewDog[] = [
  {
    name: 'Dog 1',
    kennel: 'D1',
    birthDate: new Date('10/30/92'),
    breed: 'Podenco',
    sex: Sex.Male,
    comments: 'sin comentarios',
    isSpayedOrNeutered: true,
    height: 60,
    length: 90,
    weight: 15,
    isCatFriendly: true,
    size: Size.Medium,
    youtubeUrl: 'sin url',
  },
  {
    name: 'Dog 2',
    kennel: 'D2',
    birthDate: new Date('12/21/98'),
    breed: 'Bodeguero',
    sex: Sex.Female,
    comments: 'sin comentarios',
    isSpayedOrNeutered: true,
    height: 40,
    length: 50,
    weight: 12,
    isCatFriendly: true,
    size: Size.MediumLittle,
    youtubeUrl: 'sin url',
  },
]

const usersInDb = async () => {
  const users = await UserModel.find({})
  return users.map((user) => user.toJSON())
}

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
  usersInDb,
  dogsInDb,
  nonExistingId,
}
