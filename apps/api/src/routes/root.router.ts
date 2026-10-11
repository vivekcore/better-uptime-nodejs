import Router from "express";
import { user_routes } from "./user.router"

export const root_roouter = Router();

root_roouter.get("/user", user_routes);