import { Router } from "express";
import UserRoutes from "./user.router"
import WebsiteRouter from "./website.router";

const RootRouter:Router = Router();

RootRouter.use("/user", UserRoutes);
RootRouter.use("/website", WebsiteRouter);

export default RootRouter;