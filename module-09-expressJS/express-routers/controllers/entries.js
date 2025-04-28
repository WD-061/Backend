import Entry from '../models/Entry.js';
import User from '../models/User.js';

export const getAllEntries = async (req, res) => {
  try {
    const allEntries = await Entry.findAll({
      include: [{ model: User, as: 'author', attributes: ['name', 'email'] }], //populate user info as author
    });
    res.status(200).json(allEntries);
  } catch (error) {
    console.log(error);
    res.status(500).json({ errorMessage: 'Something went wrong' });
  }
};

export const createEntry = async (req, res) => {
  const newEntry = req.body;
  try {
    const createdEntry = await Entry.create(newEntry);
    res.status(200).json(createdEntry);
  } catch (error) {
    res.status(500).json({ errorMessage: 'Something went wrong' });
  }
};
