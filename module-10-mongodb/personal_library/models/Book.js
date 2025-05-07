import mongoose from 'mongoose';

const BookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minLength: [2, 'min length is 2 chars'],
        maxLength: 255,
    },
    isbn: {
        type: Number,
        required: true,
        unique: true,
    },
    author: {
        type: String,
        required: true,
    },
});

export default mongoose.model('Book', BookSchema);
