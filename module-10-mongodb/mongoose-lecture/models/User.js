import { Schema, model } from 'mongoose';

const userSchema = new Schema({
  firstName: {
    type: String,
    required: [true, 'First Name is required!'], //Custom error message
    minLength: 1,
  },
  age: {
    type: Number,
    required: true,
    min: 1,
  },
  hobbies: {
    type: [String], //Stores an array of strings
  },
});

const User = model('User', userSchema);

export default User;
