import User from '../models/User.js';
import ErrorResponse from '../utils/ErrorResponse.js';

export const createUser = async (req, res) => {
  const { firstName, age, hobbies } = req.body;

  try {
    const user = await User.create({ firstName, age, hobbies });
    res.status(200).json(user);
  } catch (error) {
    throw new ErrorResponse(error.errors['firstName'].message, 401);
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const allUsers = await User.find();
    res.status(200).json(allUsers);
  } catch (error) {
    throw new ErrorResponse('Failed to fetch users', 500);
  }
};

export const getUserByID = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id);

    if (!user) throw new ErrorResponse('Could not find user', 404);
    res.status(200).json(user);
  } catch (error) {
    if (error.message === 'Could not find user') {
      throw new ErrorResponse(error.message, error.statusCode);
    } else {
      throw new ErrorResponse('Something went wrong', 400);
    }
  }
};
