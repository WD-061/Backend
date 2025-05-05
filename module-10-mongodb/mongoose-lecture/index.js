import express from 'express';
import cors from 'cors';
import userRouter from './routers/userRouter.js';
import entryRouter from './routers/entryRouter.js';

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.use('/users', userRouter);
app.use('/entries', entryRouter);

app.listen(port, () => console.log(`Server is listening on port ${port}`));
