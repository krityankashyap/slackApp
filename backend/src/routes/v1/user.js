import express from 'express';
import { signIn, signup } from '../../controller/userController.js';
import { validate } from '../../validators/zodValidator.js';
import { userSigninSchema, userSignupSchema } from '../../validators/userValidator.js';


const userRouter = express.Router();

userRouter.get('/ping' , (req , res)=>{
  res.status(200).json({
    message: "pong"
  });
});

userRouter.post('/signup' , validate(userSignupSchema) , signup);
userRouter.post('/signin' ,  validate(userSigninSchema) , signIn)

export default userRouter