import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const citySchema = new Schema({
  City: {
    type: String,
    required: true,
    unique: true,
  },
  State: {
    type: String,
    required: true,
  },
  Population: {
    type: Number,
    required: true,
    default: 0,
  }
},
{
  strict: true,
})

export const City = mongoose.model('City', citySchema);
