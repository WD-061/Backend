import { Router } from 'express';
import validateSchema from '../middlewares/validateSchema.js';
import {
  createPost,
  deletePost,
  getAllPosts,
  getSinglePost,
  updatePost,
} from '../controllers/posts.js';
import { postSchema } from '../joi/schemas.js';
import verifyToken from '../middlewares/verifyToken.js';

const postsRouter = Router();

postsRouter
  .route('/')
  .get(getAllPosts)
  .post(validateSchema(postSchema), verifyToken, createPost);

postsRouter
  .route('/:id')
  .get(getSinglePost)
  .put(validateSchema(postSchema), verifyToken, updatePost)
  .delete(verifyToken, deletePost);

export default postsRouter;
