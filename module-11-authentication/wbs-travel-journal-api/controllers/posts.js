import { isValidObjectId } from 'mongoose';
import Post from '../models/Post.js';
import ErrorResponse from '../utils/ErrorResponse.js';

export const getAllPosts = async (req, res, next) => {
  const posts = await Post.find().populate('author');
  res.json(posts);
};

export const createPost = async (req, res, next) => {
  const { body } = req;

  const newPost = await (
    await Post.create({ ...body, author: req.userId })
  ).populate('author');

  res.status(201).json(newPost);
};

export const getSinglePost = async (req, res, next) => {
  const {
    params: { id },
  } = req;

  // Mongoose offers a method to check if the id is valid
  if (!isValidObjectId(id)) throw new ErrorResponse('Invalid id', 400);

  const post = await Post.findById(id).populate('author');
  if (!post)
    throw new ErrorResponse(`Post with id of ${id} doesn't exist`, 404);

  res.send(post);
};

export const updatePost = async (req, res, next) => {
  const {
    body,
    params: { id },
  } = req;

  if (!isValidObjectId(id)) throw new ErrorResponse('Invalid id', 400);

  const post = await Post.findById(id);

  if (post.author.toString() !== req.userId)
    throw new ErrorResponse('You are not authorized to update this post', 403);

  const updatedPost = await Post.findByIdAndUpdate(id, body, {
    new: true,
  }).populate('author');

  if (!updatedPost)
    throw new ErrorResponse(`Post with id of ${id} doesn't exist`, 404);

  res.json(updatedPost);
};

export const deletePost = async (req, res, next) => {
  const {
    params: { id },
  } = req;

  if (!isValidObjectId(id)) throw new ErrorResponse('Invalid id', 400);

  const post = await Post.findById(id);

  if (post.author.toString() !== req.userId)
    throw new ErrorResponse('You are not authorized to delete this post', 403);

  const deletedPost = await Post.findByIdAndDelete(id).populate('author');
  if (!deletedPost) throw new Error(`Post with id of ${id} doesn't exist`);

  res.json({ success: `Post with id of ${id} was deleted` });
};
