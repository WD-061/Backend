import express from 'express';
import userRouter from './routers/userRouter.js';
import entryRouter from './routers/entryRouter.js';

const app = express();
const port = 3000;

// Middleware that parses json request bodies
app.use(express.json());

//user endpoints
app.use('/users', userRouter);

//entry endpoints
app.use('/entries', entryRouter);

app.listen(port, () => console.log(`Server is listening on port ${port}`));
