import Entry from '../models/Entries.js';

export const createEntry = async (req, res) => {
  const { title, content, authorID } = req.body;

  const entry = await Entry.create({ title, content, authorID });
  res.status(200).json(entry);
};

export const getAllEntries = async (req, res) => {
  try {
    const allEntries = await Entry.find().populate(
      'authorID',
      'firstName age -_id'
    );
    res.status(200).json(allEntries);
  } catch (error) {}
};
