import express from 'express';
import cors from 'cors';
import userRouter from './router/userRouter.js';
import { log } from './middleware/log.js';
import { errorHandler } from './middleware/errorHandler.js';

const app = express();

//Third part middleware
app.use(cors());

//In built middleware
app.use(express.json());

//Application level middleware AND a custom middlware
app.use(log);

// user endpoint
app.use('/users', userRouter);

//Error handler
app.use(errorHandler);

app.listen(3000, () => console.log('Server is running on port 3000'));
