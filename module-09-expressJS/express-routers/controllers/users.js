import User from '../models/User.js';

export const createUser = async (req, res) => {
  const newUser = req.body;

  try {
    const createdUser = await User.create(newUser);
    res.status(200).json(createdUser);
  } catch (error) {
    res.status(500).json({ errorMessage: 'Failed to create user' });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ errorMessage: 'Something went wrong' });
  }
};

export const getUserByID = async (req, res) => {
  const userID = req.params.id;

  try {
    const user = await User.findByPk(userID);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ errorMessage: 'User could not be found' });
  }
};
