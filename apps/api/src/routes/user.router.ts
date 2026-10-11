import { Router } from "express"
import { userController } from "../controllers/user.controller";

const UserRoutes:Router = Router();

UserRoutes.post("/signup",userController.signup);
UserRoutes.post("/signin",userController.signin);

export default UserRoutes;