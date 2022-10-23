import mongoose from 'mongoose'

const dogSchema = new mongoose.Schema({
  createTime: Date,
  updateTime: Date,
  name: String,
  kennel: String,
  birthDate: String,
  breed: String,
  sex: String,
  comments: String,
  isSpayedOrNeutered: Boolean,
  height: Number,
  length: Number,
  weight: Number,
  isCatFriendly: Boolean,
  size: String,
  youtubeUrl: String,
})

dogSchema.set('toJSON', {
  transform: (_document, returnedObject) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
})

export default mongoose.model('Dog', dogSchema)
