import mongoose from 'mongoose'
import supertest from 'supertest'

import app from '../app'
import DogModel from '../models/dogModel'
import { Dog, NewDog, Sex, Size } from '../types/dog'
import helper from './testHelper'

const api = supertest(app)

beforeEach(async () => {
  await DogModel.deleteMany({})
  await DogModel.insertMany(helper.initialDogs)
})

describe('when there is initially some dogs saved', () => {
  test('dogs are returned as json', async () => {
    await api
      .get('/api/dogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all dogs are returned', async () => {
    const response = await api.get('/api/dogs')

    expect(response.body).toHaveLength(helper.initialDogs.length)
  })

  test('a specific dog is within the returned dogs', async () => {
    const response = await api.get('/api/dogs')

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const body: Dog[] = response.body

    const names = body.map((dog) => dog.name)
    expect(names).toContain('Dog 2')
  })
})

describe('viewing a specific dog', () => {
  test('succeeds with a valid id', async () => {
    const dogsAtStart = await helper.dogsInDb()

    const dogToView = dogsAtStart[0] as Dog

    const resultDog = await api
      .get(`/api/dogs/${dogToView.id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const processedDogToView = JSON.parse(JSON.stringify(dogToView)) as Dog

    expect(resultDog.body).toEqual(processedDogToView)
  })

  test('fails with status code 404 if dog does not exist', async () => {
    const validNonexistingId = await helper.nonExistingId()

    await api.get(`/api/dogs/${validNonexistingId}`).expect(404)
  })

  test('fails with status code 400 if id is invalid', async () => {
    const invalidId = '5a3d5da59070081a82a3445'

    await api.get(`/api/dogs/${invalidId}`).expect(400)
  })
})

describe('addition of a new dog', () => {
  test('succeeds with valid data', async () => {
    const newDog: NewDog = {
      name: 'Dog 3',
      kennel: 'D3',
      birthDate: new Date('01/01/22'),
      breed: 'Podenco',
      sex: Sex.Male,
      comments: 'sin comentarios',
      isSpayedOrNeutered: true,
      height: 40,
      length: 50,
      weight: 10,
      isCatFriendly: true,
      size: Size.MediumLittle,
      youtubeUrl: 'sin url',
    }

    await api
      .post('/api/dogs')
      .send(newDog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const dogsAtEnd = await helper.dogsInDb()
    expect(dogsAtEnd).toHaveLength(helper.initialDogs.length + 1)

    const names = dogsAtEnd.map((dog) => dog.name)
    expect(names).toContain('Dog 3')
  })

  test('fails with status code 400 if data is invalid', async () => {
    const newDog: NewDog = {
      name: '',
      kennel: 'D4',
      birthDate: new Date('01/01/22'),
      breed: 'Podenco',
      sex: Sex.Female,
      comments: 'sin comentarios',
      isSpayedOrNeutered: true,
      height: 40,
      length: 50,
      weight: 10,
      isCatFriendly: true,
      size: Size.MediumLittle,
      youtubeUrl: 'sin url',
    }

    await api.post('/api/dogs').send(newDog).expect(400)

    const dogsAtEnd = await helper.dogsInDb()
    expect(dogsAtEnd).toHaveLength(helper.initialDogs.length)
  })
})

describe('deletion of a dog', () => {
  test('succeeds with status code 204 if id is valid', async () => {
    const dogsAtStart = await helper.dogsInDb()
    const dogToDelete = dogsAtStart[0] as Dog

    await api.delete(`/api/dogs/${dogToDelete.id}`).expect(204)

    const dogsAtEnd = await helper.dogsInDb()
    expect(dogsAtEnd).toHaveLength(helper.initialDogs.length - 1)

    const names = dogsAtEnd.map((dog) => dog.name)
    expect(names).not.toContain(dogToDelete.name)
  })
})

afterAll(async () => {
  await mongoose.connection.close()
})
