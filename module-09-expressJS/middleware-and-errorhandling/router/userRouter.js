import { Router } from 'express';
import { getAllUser, createUser } from '../controller/users.js';
import { routeMiddleware, verifyAdmin } from '../middleware/users.js';

const userRouter = Router();

userRouter.get('/', verifyAdmin, routeMiddleware, getAllUser);
userRouter.post('/', routeMiddleware, createUser);

export default userRouter;
