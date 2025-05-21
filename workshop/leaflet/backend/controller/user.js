import User from '../models/User.js';

export const getUsers = async (req, res) => {
  const { radius = 5000 } = req.query;

  const allUsers = await User.find({
    'address.location': {
      $near: {
        $geometry: {
          type: 'Point',
          coordinates: [13.54007, 52.457131], //This is the center of the radius
        },
        $maxDistance: radius, //in meters
      },
    },
  });

  res.status(200).json(allUsers);
};
