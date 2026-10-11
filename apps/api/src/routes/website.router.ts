import { Router } from "express"
import { auth_middleware } from "../middleware/auth.middleware";
import { websiteController } from "../controllers/website.controller";

const WebsiteRouter:Router = Router();

WebsiteRouter.post("/add-site", auth_middleware, websiteController.addSite);
WebsiteRouter.get("/fetch-sites", auth_middleware, websiteController.fetchAllSites);
WebsiteRouter.get("/fetch-one/:id", auth_middleware, websiteController.fetchOneSite);

export default WebsiteRouter;