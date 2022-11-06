/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import mongoose from 'mongoose'

const treatmentSchema = new mongoose.Schema({
  createTime: Date,
  updateTime: Date,
  parts: [
    {
      name: String,
      steps: [
        {
          medication: String,
          description: String,
        },
      ],
    },
  ],
  dog: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Dog',
  },
})

treatmentSchema.set('toJSON', {
  transform: (_document, returnedObject) => {
    returnedObject.parts = returnedObject.parts.map((part: any) => {
      return {
        name: part.name,
        steps: part.steps.map((step: any) => {
          return {
            medication: step.medication,
            description: step.description,
            id: step._id.toString(),
          }
        }),
        id: part._id.toString(),
      }
    })
    returnedObject.parts.forEach((part: any) => {
      part.steps.forEach((step: any) => {
        delete step._id
      })
      delete part._id
    })
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
})

export default mongoose.model('Treatment', treatmentSchema)
