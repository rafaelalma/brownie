import mongoose from 'mongoose'
import supertest from 'supertest'

import app from '../app'
import DogModel from '../models/dog'
import { Dog, NewDog } from '../types'

const api = supertest(app)

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

beforeEach(async () => {
  await DogModel.deleteMany({})
  let dogObject = new DogModel(initialDogs[0])
  await dogObject.save()
  dogObject = new DogModel(initialDogs[1])
  await dogObject.save()
})

test('dogs are returned as json', async () => {
  await api
    .get('/api/dogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

afterAll(async () => {
  await mongoose.connection.close()
})

test('all dogs are returned', async () => {
  const response = await api.get('/api/dogs')

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const body: Dog[] = response.body

  expect(body).toHaveLength(initialDogs.length)
})

test('a specific dog is within the returned dogs', async () => {
  const response = await api.get('/api/dogs')

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const body: Dog[] = response.body

  const names = body.map((dog) => dog.name)
  expect(names).toContain('Dog 2')
})

test('a valid dog can be added', async () => {
  const newDog = {
    name: 'Dog 3',
    kennel: 'D3',
    birthDate: '01/01',
    breed: 'Podenco',
    comments: 'sin comentarios',
    isSpayedOrNeutered: true,
    height: 40,
    length: 50,
    weight: 10,
    isCatFriendly: true,
    size: 'medium little',
    youtubeUrl: '',
  }

  await api
    .post('/api/dogs')
    .send(newDog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/dogs')

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const body: Dog[] = response.body

  const names = body.map((dog) => dog.name)

  expect(body).toHaveLength(initialDogs.length + 1)
  expect(names).toContain('Dog 3')
})
