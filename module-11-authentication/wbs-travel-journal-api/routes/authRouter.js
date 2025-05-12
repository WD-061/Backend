import { Router } from 'express';
import { signIn, signUp, signOut } from '../controllers/auth.js';
import validateSchema from '../middlewares/validateSchema.js';
import { signInSchema, signUpSchema } from '../joi/schemas.js';

const authRouter = Router();

//endpoints
authRouter.post('/signin', validateSchema(signInSchema), signIn);
authRouter.post('/signup', validateSchema(signUpSchema), signUp);
authRouter.delete('/signout', signOut);

export default authRouter;
