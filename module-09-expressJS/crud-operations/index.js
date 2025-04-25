import express from 'express';
import cors from 'cors';
import chalk from 'chalk';

// import sequelize from './db/index.js';

import { User, Note, UsersNotes } from './models/index.js';

const app = express();
const port = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ msg: 'Running' });
});

app.post('/users', async (req, res) => {
  const { firstName, lastName, email } = req.body;
  // usually user data needs to be validated!
  try {
    // Model creates SQL query for us
    const user = await User.create({ firstName, lastName, email });
    res.status(201).json({ msg: 'User created successfully!', data: user });
  } catch (error) {
    // proper error handling will be covered later
    console.log(error);
    res.status(500).json({ msg: 'Server Error' });
  }
});

app.get('/users', async (req, res) => {
  try {
    const users = await User.findAll();
    res.json({ data: users });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: 'Server Error' });
  }
});

app.get('/users/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByPk(id, { include: Note });
    if (!user) return res.status(404).json({ msg: 'User not found' });
    res.json({ data: user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: 'Server Error' });
  }
});

app.put('/users/:id', async (req, res) => {
  const { id } = req.params;
  const { firstName, lastName, email } = req.body;
  try {
    const user = await User.update({ firstName, lastName, email }, { where: { id }, returning: true });
    if (user[0] !== 1) return res.status(404).json({ msg: 'User not found' });
    res.json({ data: user[1], msg: 'Update successful' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: 'Server Error' });
  }
});

app.delete('/users/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const dbResponse = await User.destroy({ where: { id } });
    if (dbResponse !== 1) return res.status(404).json({ msg: 'User not found' });
    res.json({ msg: 'User deleted' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: 'Server Error' });
  }
});

app.post('/notes', async (req, res) => {
  const { content, userId } = req.body;
  try {
    // const note = await Note.create({ content, userId }); // on one-to-many relations

    // many-to-many relations
    const note = await Note.create({ content }); // first create note
    await UsersNotes.create({ userId, noteId: note.id }); // add user and note to the junction table

    res.status(201).json({ msg: 'Note created successfully!', data: note });
  } catch (error) {
    // proper error handling will be covered later
    console.log(error);
    res.status(500).json({ msg: 'Server Error' });
  }
});

app.get('/notes', async (req, res) => {
  try {
    const notes = await Note.findAll();
    res.json({ data: notes });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: 'Server Error' });
  }
});

app.get('/notes/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const note = await Note.findByPk(id, { include: User });
    if (!note) return res.status(404).json({ msg: 'Note not found' });
    res.json({ data: note });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: 'Server Error' });
  }
});

app.put('/notes/:id', async (req, res) => {
  const { id } = req.params;
  const { content } = req.body;
  try {
    const note = await Note.update({ content }, { where: { id }, returning: true });
    if (note[0] !== 1) return res.status(404).json({ msg: 'Note not found' });
    res.json({ data: note[1], msg: 'Update successful' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: 'Server Error' });
  }
});

app.post('/users/:userId/notes/:noteId', async (req, res) => {
  const { userId, noteId } = req.params;
  try {
    const result = await UsersNotes.create({ userId, noteId }); // add user and note to the junction table

    res.status(201).json({ msg: 'Note created successfully!', data: result });
  } catch (error) {
    // proper error handling will be covered later
    console.log(error);
    res.status(500).json({ msg: 'Server Error' });
  }
});

app.delete('/notes/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const dbResponse = await Note.destroy({ where: { id } });
    if (dbResponse !== 1) return res.status(404).json({ msg: 'Note not found' });
    res.json({ msg: 'Note deleted' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: 'Server Error' });
  }
});

app.listen(port, () => {
  console.log(chalk.bgGreen(`Server is listening on port ${port}`));
});
