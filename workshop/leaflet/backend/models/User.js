import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const userSchema = new Schema({
  firstName: { type: String, required: true },
  displayImg: { type: String, required: true },
  address: {
    street: { type: String, required: true },
    houseNumber: { type: String, required: true },
    postalCode: { type: String, required: true },
    city: { type: String, required: true },
    location: {
      type: {
        type: String,
        enum: ['Point'],
        default: 'Point',
        required: true,
      },
      coordinates: {
        type: [Number], //[longitude, latitude]
        required: true,
      },
    },
  },
  createdAt: { type: Date, default: Date.now },
});

userSchema.index({ 'address.location': '2dsphere' }); //Create index

export default model('User', userSchema);
