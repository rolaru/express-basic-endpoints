import { Router } from 'express';
import authController from './controllers/auth.controller';
import userController from './controllers/user.controller';
import postController from './controllers/post.controller';

// We create the router that we will use in our web server
const appRouter = Router();

// Here we mount a controller router for each path
appRouter.use('/auth', authController);
appRouter.use('/users', userController);
appRouter.use('/posts', postController);

export default appRouter;