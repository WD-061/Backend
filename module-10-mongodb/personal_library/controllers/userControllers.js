import ErrorResponse from '../utils/ErrorResponse.js';
import User from '../models/User.js';

const getAllUsers = async (req, res) => {
  const users = await User.find().populate('readingList.bookRefId');

  if (!users.length) {
    return res.status(200).json({ msg: 'No users in the DB' });
  }

  res.status(200).json(users);
};

const createUser = async (req, res) => {
  const { firstName, lastName, email } = req.body;

  if (!firstName || !lastName || !email) {
    throw new ErrorResponse(
      'First name, last name, and email are required',
      400
    );
  }

  const found = await User.findOne({ email });

  if (found) {
    throw new ErrorResponse('Email already exists', 400);
  }

  const user = await User.create({ firstName, lastName, email });

  res.status(201).json(user);
};

// get one user
const getOneUser = async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id).populate('readingList.bookRefId');

  if (!user) {
    throw new ErrorResponse('User not found', 404);
  }

  res.status(200).json(user);
};

const updateUser = async (req, res) => {
  const { firstName, lastName, email } = req.body;
  const { id } = req.params;

  if (!firstName || !lastName || !email) {
    throw new ErrorResponse(
      'First name, last name, and email are required',
      400
    );
  }

  const user = await User.findByIdAndUpdate(
    id,
    { firstName, lastName, email },
    { new: true }
  );

  if (!user) {
    throw new ErrorResponse('User not found', 404);
  }

  res.status(200).json(user);
};

const deleteOneUser = async (req, res) => {
  const { id } = req.params;

  const user = await User.findByIdAndDelete(id);

  if (!user) {
    throw new ErrorResponse('User not found', 404);
  }

  res.status(200).json({ message: 'User deleted' });
};

const addBookToList = async (req, res) => {
  const { bookRefId } = req.body;
  const { id } = req.params;

  if (!bookRefId) {
    throw new ErrorResponse('bookRefId required', 400);
  }

  const newBook = {
    bookRefId,
  };
  const user = await User.findById(id);

  if (!user) {
    throw new ErrorResponse('User not found', 404);
  }

  user.readingList.push(newBook);
  await user.save();

  res.status(200).json(user);
};

const updateBookInList = async (req, res) => {
  const { id, bookId } = req.params;
  const { status } = req.body;

  if (!status) {
    throw new ErrorResponse('bookRefId required', 400);
  }

  const user = await User.findById(id);

  if (!user) {
    throw new ErrorResponse('User not found', 404);
  }

  //id() method below searches array items with a matching _id
  //https://mongoosejs.com/docs/subdocs.html#finding-a-subdocument
  const book = user.readingList.id(bookId);

  if (!book) {
    throw new ErrorResponse('Book not found', 404);
  }

  book.status = status;
  await user.save();

  res.status(200).json(user);
};

const removeBookFromList = async (req, res) => {
  const { id, bookId } = req.params;

  const user = await User.findById(id);

  if (!user) {
    throw new ErrorResponse('User not found', 404);
  }

  user.readingList.id(bookId).deleteOne();
  await user.save();

  res.status(200).json(user);
};

export {
  getAllUsers,
  getOneUser,
  createUser,
  updateUser,
  deleteOneUser,
  addBookToList,
  removeBookFromList,
  updateBookInList,
};
