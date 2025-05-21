import User from '../models/User.js';
import { getCoordinates } from '../utils/getCoordinates.js';

export const signup = async (req, res) => {
  const { firstName, displayImg, address } = req.body;

  // Usually check if user exists

  const { lat, lng } = await getCoordinates(address);

  const user = await User.create({
    firstName,
    displayImg,
    address: {
      ...address,
      location: {
        coordinates: [lng, lat], //Always longitude first and then latitude
      },
    },
  });

  res.status(200).json(user);
};
