import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    minLength: [2, 'min length is 2 chars'],
    maxLength: 100,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please use a valid email',
    ],
  },
  readingList: {
    type: [
      {
        bookRefId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Book',
          required: true,
        },
        status: {
          type: String,
          enum: ['read', 'not read', 'pending'],
          default: 'pending',
        },
      },
    ],
  },
});

export default mongoose.model('User', UserSchema);
