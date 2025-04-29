import ErrorResponse from '../utils/ErrorResponse.js';

export const getAllUser = (req, res) => {
  throw new ErrorResponse('Failed to fetch users', 400);
  res.send('Fetching all users');
};

export const createUser = (req, res) => {
  res.send('Creating user');
};
