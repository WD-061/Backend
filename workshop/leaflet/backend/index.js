import express from 'express';
import cors from 'cors';
import './db/dbConnection.js';
import authRouter from './router/authRouter.js';
import userRouter from './router/userRouter.js';
import errorHandler from './middleware/errorHandler.js';

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(cors());

app.use('/auth', authRouter);
app.use('/users', userRouter);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
