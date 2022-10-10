import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  username: String,
  passwordHash: String,
  name: String,
  email: String,
  roles: [String],
})

userSchema.set('toJSON', {
  transform: (_document, returnedObject) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    delete returnedObject.passwordHash
  },
})

export default mongoose.model('User', userSchema)
