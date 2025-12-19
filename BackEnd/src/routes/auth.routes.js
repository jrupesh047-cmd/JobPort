import { login, registerUser,verifyToken,logout, getMe} from '../controllers/auth.controller.js';
import authMiddlwear from '../middlewares/auth.middlware.js';
import {Router} from 'express'

const authRouter = Router();
authRouter.route('/me').get(authMiddlwear,getMe)
authRouter.route('/register').post(registerUser)
authRouter.route('/login').post(login);
authRouter.route('/verifyToken').post(verifyToken);
authRouter.route('/logout').post(logout);


export default authRouter;
