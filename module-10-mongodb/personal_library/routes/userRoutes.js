import { Router } from 'express';
import {
  getAllUsers,
  getOneUser,
  createUser,
  updateUser,
  deleteOneUser,
  addBookToList,
  removeBookFromList,
  updateBookInList,
} from '../controllers/userControllers.js';

const userRouter = Router();

userRouter.route('/').get(getAllUsers).post(createUser);
userRouter.route('/:id').get(getOneUser).put(updateUser).delete(deleteOneUser);
userRouter.route('/:id/books').post(addBookToList);
userRouter
  .route('/:id/books/:bookId')
  .put(updateBookInList)
  .delete(removeBookFromList);

export default userRouter;
