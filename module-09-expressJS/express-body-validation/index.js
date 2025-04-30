import './db/associations.js';
import express from 'express';
import postRouter from './routers/postRouter.js';
import userRouter from './routers/userRouter.js';

const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());

app.use('/posts', postRouter);
app.use('/users', userRouter);

app.use((err, req, res, next) => {
  process.env.NODE_ENV !== 'production' && console.log(err.stack);
  res.status(err.statusCode || 500).json({ message: err.message });
});

app.listen(port, () => console.log(`Server is running on port ${port}`));
