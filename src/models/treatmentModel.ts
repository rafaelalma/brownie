/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import mongoose from 'mongoose'

const treatmentSchema = new mongoose.Schema({
  createTime: Date,
  updateTime: Date,
  name: String,
  stages: [
    {
      medication: String,
      description: String,
    },
  ],
  dog: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Dog',
    },
  ],
})

treatmentSchema.set('toJSON', {
  transform: (_document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    returnedObject.stages = returnedObject.stages.map((stage: any) => {
      return {
        medication: stage.medication,
        description: stage.description,
        id: stage._id.toString(),
      }
    })
    returnedObject.stages.forEach((stage: any) => {
      delete stage._id
    })
    delete returnedObject._id
    delete returnedObject.__v
  },
})

export default mongoose.model('Treatment', treatmentSchema)
