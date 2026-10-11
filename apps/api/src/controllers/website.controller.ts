import type { NextFunction, Request, Response } from "express";
import { catchAsync } from "../utils/AsyncApi";
import { websiteServices } from "../services/website.services";
import { date } from "better-auth";

export const websiteController = {

    addSite: (
        catchAsync(
            async(req:Request,res: Response, next:NextFunction) => {
                const {url} = req.body;
                const id = req.user_id;
                console.log(id)
                const response = await websiteServices.addSite(url,id);
                res.json({
                    message: "success",
                    data: response
                })
            }
        )
    ),
    fetchAllSites: (
         catchAsync(
            async(req:Request,res: Response, next:NextFunction) => {
                const id = req.user_id;
                const response = await websiteServices.fetchAllSites(id);
                res.json({
                    message: "success",
                    data: response
                })
            }
        )
    ),
    fetchOneSite: (
         catchAsync(
            async(req:Request,res: Response, next:NextFunction) => {
                const site_id = req.params.id as string;
                const id = req.user_id;
                const response = await websiteServices.fetchOneSite(site_id,id);
                res.json({
                    message: "success",
                    data: response
                })
            }
        )
    ) ,
}