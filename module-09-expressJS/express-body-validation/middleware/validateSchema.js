import ErrorResponse from '../utils/ErrorResponse.js';

export const validateSchema = (joiSchema) => (req, res, next) => {
  const { error } = joiSchema.validate(req.body);

  if (error) throw new ErrorResponse('Invalid body', 400);

  next();
};

//The following would be the alternative but with a lot of duplicate code

// export const validateUserSchema = (req, res, next) => {
//   const { error } = userSchema.validate(req.body);

//   if (error) throw new ErrorResponse('Invalid body', 400);

//   next();
// };

// export const validatePostSchema = (req, res, next) => {
//   const { error } = postSchema.validate(req.body);

//   if (error) throw new ErrorResponse('Invalid body', 400);

//   next();
// };
