import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const url = process.env.MONGODB_URI;

console.log('Connecting to', url);

if (url) {
  mongoose
    .connect(url)
    .then(() => {
      console.log('Connected to MongoDB');
    })
    .catch((error) => {
      console.log('Error connecting to MongoDB:', error.message);
    });
} else {
  console.log('No MongoDB URI');
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
