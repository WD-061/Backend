import express from 'express';
import './db/dbConnection.js';
import userRouter from './routes/userRoutes.js';
import bookRouter from './routes/bookRoutes.js';
import errorHandler from './middleware/errorHandler.js';

const app = express();

// usual middleware
app.use(express.json());

const PORT = process.env.PORT || 8080;

app.use('/users', userRouter);
app.use('/books', bookRouter);

//Below code is for any endpoints not mentioned above.
//Eg: '/products' should send a 404 response since we don't have that above
// Why call it splat? It is just a name; you can choose any name you like for the parameter. Express calls it that in their docs.
// https://expressjs.com/en/guide/migrating-5.html#:~:text=Changed-,Path%20route%20matching%20syntax,-Path%20route%20matching
app.use('/*splat', (req, res) => res.status(404).json({ error: 'Not Found' }));

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
