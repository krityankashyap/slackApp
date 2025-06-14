import express from 'express';

const userRouter = express.Router();

userRouter.get('/ping' , (req , res)=>{
  res.status(200).json({
    message: "pong"
  });
});

export default userRouter