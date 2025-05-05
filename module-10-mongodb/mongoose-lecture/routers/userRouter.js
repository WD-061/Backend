import { Router } from 'express';
import { createUser, getAllUsers, getUserByID } from '../controllers/users.js';

const userRouter = Router();

userRouter.route('/').get(getAllUsers).post(createUser);
userRouter.route('/:id').get(getUserByID);

export default userRouter;
