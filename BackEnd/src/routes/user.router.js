import { Router } from "express";
import authMiddleware from "../middlware/auth.middlware.js";
import role from "../middlware/roleBased.middlware.js";
import { getAllUser, getSingleUser } from "../controller/user.controller.js";

const userRoutes = Router();
userRoutes.route('/').get(authMiddleware,role('admin','manager'),getAllUser)
userRoutes.route('/:id').get(authMiddleware,role('admin','manager'),getSingleUser)
export default userRoutes;