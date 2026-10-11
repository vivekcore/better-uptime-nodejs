import Router from "express"
import { userController } from "../controllers/user.controller";

export const user_routes = Router();

user_routes.post("/signup",userController.signup);
user_routes.post("/signin",userController.signin);