import { Router } from "express";
import authMiddleware from '../middlewares/auth.middlware.js'
import { getAllUser, getSingleUser } from "../controllers/user.controller.js";

const userRoutes = Router();
userRoutes.route('/').get(authMiddleware,getAllUser)
userRoutes.route('/:id').get(authMiddleware,getSingleUser)
export default userRoutes;