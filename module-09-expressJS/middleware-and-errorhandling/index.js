import express from 'express';
import cors from 'cors';
import userRouter from './router/userRouter.js';
import { log } from './middleware/log.js';
import { errorHandler } from './middleware/errorHandler.js';
import ErrorResponse from './utils/ErrorResponse.js';

const app = express();

//Third part middleware
app.use(cors());

//In built middleware
app.use(express.json());

//Application level middleware AND a custom middlware
app.use(log);

// user endpoint
app.use('/users', userRouter);

// This runs when it does not find a matching endpoint above
// Now we send a json body instead of the default express html template
app.use((req, res) => {
  throw new ErrorResponse('Page not found', 404);
});

//Error handler
app.use(errorHandler);

app.listen(3000, () => console.log('Server is running on port 3000'));
