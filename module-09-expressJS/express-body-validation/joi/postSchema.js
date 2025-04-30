import Joi from 'joi';

const postSchema = Joi.object({
  title: Joi.string().min(3).max(255).required(),
  content: Joi.string().min(3).max(1000).required(),
  userId: Joi.number().integer().min(1).required(),
}).required();

export default postSchema;
