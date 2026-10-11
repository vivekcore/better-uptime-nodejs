import { catchAsync } from "../utils/AsyncApi";
import type {Request, Response, NextFunction} from "express"

export const userController = {
    signup: (
        catchAsync(
            async (req:Request, res: Response, next: NextFunction) => {

            }
        )
    ),
    signin: (
        catchAsync(
           async (req:Request, res: Response, next: NextFunction) => {

            }
        )
    )
}