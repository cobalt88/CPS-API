import mongoose from 'mongoose';

const citySchema = new mongoose.Schema({
  City: {
    type: String,
    required: true,
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
  strict: true
})

export const Cities = mongoose.model('cities', citySchema);
