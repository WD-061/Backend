import { Schema, model } from 'mongoose';

const entrySchema = new Schema({
  title: String,
  content: {
    type: String,
    required: true,
    maxLenght: 1000,
  },
  authorID: {
    type: Schema.Types.ObjectId,
    ref: 'User', //Refer the collection name where mongoose can find this document
  },
});

const Entry = model('Entry', entrySchema);

export default Entry;
