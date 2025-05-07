import { Router } from 'express';
import {
  getAllBooks,
  getOneBook,
  createBook,
  updateBook,
  deleteOneBook,
} from '../controllers/bookControllers.js';

const bookRouter = Router();

bookRouter.route('/').get(getAllBooks).post(createBook);
bookRouter.route('/:id').get(getOneBook).put(updateBook).delete(deleteOneBook);

export default bookRouter;
