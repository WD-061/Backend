import express from 'express';
import { DataTypes, Sequelize } from 'sequelize';

const sequelize = new Sequelize(process.env.PG_URI);

const Recipe = sequelize.define('Recipe', {
  title: {
    type: DataTypes.STRING,
  },
  description: {
    type: DataTypes.TEXT,
  },
  time: {
    type: DataTypes.INTEGER,
  },
  ingredients: {
    type: DataTypes.TEXT,
  },
});

// Recipe.sync({ force: true });
Recipe.sync();

const app = express();
const port = process.env.PORT || 8000;

// We need to tell express, what kind of request body we are expecting
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ msg: 'Running' });
});

app.post('/recipes', async (req, res) => {
  const { title, description, time, ingredients } = req.body;
  // usually user data needs to be validated!
  try {
    // Model creates SQL query for us
    const recipe = await Recipe.create({ title, description, time, ingredients });
    res.status(201).json({ msg: 'Recipe created successfully!', data: recipe });
  } catch (error) {
    // proper error handling will be covered later
    console.log(error);
    res.status(500).json({ msg: 'Server Error' });
  }
});

app.get('/recipes', async (req, res) => {
  try {
    const recipes = await Recipe.findAll();
    res.json({ data: recipes });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: 'Server Error' });
  }
});

app.get('/recipes/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const recipe = await Recipe.findByPk(id);
    if (!recipe) return res.status(404).json({ msg: 'Recipe not found' });
    res.json({ data: recipe });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: 'Server Error' });
  }
});

app.put('/recipes/:id', async (req, res) => {
  const { id } = req.params;
  const { title, description, time, ingredients } = req.body;
  try {
    const recipe = await Recipe.update({ title, description, time, ingredients }, { where: { id }, returning: true });
    if (recipe[0] !== 1) return res.status(404).json({ msg: 'Recipe not found' });
    res.json({ data: recipe[1], msg: 'Update successful' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: 'Server Error' });
  }
});

app.delete('/recipes/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const dbResponse = await Recipe.destroy({ where: { id } });
    if (dbResponse !== 1) return res.status(404).json({ msg: 'Recipe not found' });
    res.json({ msg: 'Recipe deleted' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: 'Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
