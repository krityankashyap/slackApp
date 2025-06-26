import express from 'express';
import userRoutes from './user.js'
import workspaceRouter from './workSpaceRoutes.js';
const v1Router = express.Router();

v1Router.use('/user' , userRoutes);

v1Router.use('/workspace' , workspaceRouter)

export default v1Router;