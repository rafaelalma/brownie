import mongoose from 'mongoose'
import supertest from 'supertest'
import bcrypt from 'bcrypt'

import app from '../app'
import UserModel from '../models/userModel'
import helper from './testHelper'

const SALT_ROUNDS = 10

const api = supertest(app)

beforeEach(async () => {
  await UserModel.deleteMany({})
})

describe('when there is no users in db', () => {
  test('creation succeeds with username and password', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'test',
      password: 'test',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAtEnd.map((user) => user.username)
    expect(usernames).toContain(newUser.username)
  })

  test('creation fails with status code 400 and message if user has no username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      password: 'test',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('incorrect or missing username')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toEqual(usersAtStart)
  })

  test('creation fails with status code 400 and message if user has no password', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'test',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('incorrect or missing password')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toEqual(usersAtStart)
  })
})

describe('when there is initially one user in db', () => {
  beforeEach(async () => {
    const passwordHash = await bcrypt.hash('root', SALT_ROUNDS)
    const user = new UserModel({ username: 'root', passwordHash })

    await user.save()
  })

  test('creation fails with status code 400 and message if username is already taken', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'root',
      password: 'test',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('username must be unique')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toEqual(usersAtStart)
  })
})

afterAll(async () => {
  await mongoose.connection.close()
})
