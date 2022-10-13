import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  createTime: Date,
  updateTime: Date,
  username: String,
  passwordHash: String,
  name: String,
  phone: String,
  email: String,
  roles: [Number],
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
