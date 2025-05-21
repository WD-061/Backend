import { Router } from 'express';
import { getUsers } from '../controller/user.js';

const userRouter = Router();

userRouter.get('/', getUsers);

export default userRouter;
