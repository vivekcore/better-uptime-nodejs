import type { NextFunction, Request, Response } from "express";
import { catchAsync } from "../utils/AsyncApi";

export const websiteController = {

    addSite: (
        catchAsync(
            async(req:Request,res: Response, next:NextFunction) => {

            }
        )
    ),
    fetchAllSites: (
         catchAsync(
            async(req:Request,res: Response, next:NextFunction) => {
                
            }
        )
    ),
    fetchOneSite: (
         catchAsync(
            async(req:Request,res: Response, next:NextFunction) => {
                
            }
        )
    ) ,
}