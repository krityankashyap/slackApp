import express from 'express';
import userRoutes from './user.js'
const v1Router = express.Router();

v1Router.use('/user' , userRoutes);

export default v1Router;