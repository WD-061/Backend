import { Router } from 'express';
import { createUser, getAllUsers, getUserByID } from '../controllers/users.js';

const userRouter = Router();

userRouter.get('/', getAllUsers);
userRouter.post('/', createUser);
userRouter.get('/:id', getUserByID);

// You can chaing different methods for a single endpoint like below
// userRouter.route('/').get(getAllUsers).post(createUser);
// userRouter.route('/:id').get(getUserByID);

export default userRouter;
