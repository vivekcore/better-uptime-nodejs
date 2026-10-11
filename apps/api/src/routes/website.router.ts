import Router from "express"
import { auth_middleware } from "../middleware/auth.middleware";

export const website_router = Router();

website_router.post("/add-site", auth_middleware);
website_router.get("/fetch-sites", auth_middleware);
website_router.get("/fetch-one/:id", auth_middleware);