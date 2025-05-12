import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import ErrorResponse from '../utils/ErrorResponse.js';

export const signUp = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  const userExists = await User.findOne({ email });
  if (userExists) throw new ErrorResponse('User already exists', 400);

  //Hash the password before storing it on the DB
  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({
    firstName,
    lastName,
    email,
    password: hashedPassword,
  });

  res.status(201).json(newUser);
};

export const signIn = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select('+password');
  if (!user) throw new ErrorResponse('Invalid credentials', 400);

  //Check if user typed password matches with hashed password on DB
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new ErrorResponse('Invalid credentials', 400);

  //Generate a JWT token to be sent to client
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: '7d',
  });

  const isProduction = process.env.NODE_ENV === 'production';
  const cookieOptions = {
    httpOnly: true, // Cookies are only sent with HTTP requests
    secure: isProduction, // Cookies are only sent with https when on production and http on development
    sameSite: isProduction ? 'None' : 'Lax',
  };

  res.cookie('token', token, cookieOptions);
  res.status(201).json({ message: 'Successfully logged in' });
};

export const signOut = async (req, res) => {
  const isProduction = process.env.NODE_ENV === 'production';
  const cookieOptions = {
    httpOnly: true, // Cookies are only sent with HTTP requests
    secure: isProduction, // Cookies are only sent with https when on production and http on development
    sameSite: isProduction ? 'None' : 'Lax',
  };

  res.clearCookie('token', cookieOptions);
  res.status(200).json({ message: 'Goodbye!' });
};
