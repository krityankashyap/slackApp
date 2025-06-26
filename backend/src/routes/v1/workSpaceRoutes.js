import express from 'express';
import createWorkspaceController from '../../controller/workSpaceController.js';
import { validate } from '../../validators/zodValidator.js';
import { workspaceSchema } from '../../validators/workSpaceValidator.js';
import { isAuthenticated } from '../../Middlewares/authMiddlewares.js';

const workspaceRouter = express.Router();


workspaceRouter.post('/' , isAuthenticated , validate(workspaceSchema) , createWorkspaceController)
export default workspaceRouter;