import mongoose from 'mongoose'
import supertest from 'supertest'
import app from '../app'

const api = supertest(app)

test('dogs are returned as json', async () => {
  await api
    .get('/api/dogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

afterAll(async () => {
  await mongoose.connection.close()
})
