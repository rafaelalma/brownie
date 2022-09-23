import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

import logger from '../../utils/logger';

const url = process.env.MONGODB_URI;

if (url) {
  logger.info('Connecting to', url);

  mongoose
    .connect(url)
    .then(() => {
      logger.info('Connected to MongoDB');
    })
    .catch((error: unknown) => {
      let errorMessage = 'Error connecting to MongoDB.';
      if (error instanceof Error) {
        errorMessage += ' Error: ' + error.message;
      }
      logger.error(errorMessage);
    });
} else {
  logger.error('No MongoDB URI');
}

const dogSchema = new mongoose.Schema({
  dateAdded: Date,
  name: String,
  kennel: String,
  birthDate: String,
  breed: String,
  comments: String,
  isSpayedOrNeutered: Boolean,
  height: Number,
  length: Number,
  weight: Number,
  isCatFriendly: Boolean,
  size: String,
  youtubeUrl: String,
});

dogSchema.set('toJSON', {
  transform: (_document, returnedObject) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

export default mongoose.model('Dog', dogSchema);
