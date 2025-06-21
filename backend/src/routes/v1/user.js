import express from 'express';
import { signup } from '../../controller/userController.js';
import { validate } from '../../validators/zodValidator.js';
import { userSignupSchema } from '../../validators/userValidator.js';

const userRouter = express.Router();

userRouter.get('/ping' , (req , res)=>{
  res.status(200).json({
    message: "pong"
  });
});

userRouter.post('/signup' , validate(userSignupSchema) , signup);

export default userRouter