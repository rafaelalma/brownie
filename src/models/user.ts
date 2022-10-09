import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  username: String,
  name: String,
  passwordHash: String,
})

userSchema.set('toJSON', {
  transform: (_document, returnedObject) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject._v
  },
})

export default mongoose.model('User', userSchema)
