import { userServices } from "../services/user.services";
import { catchAsync } from "../utils/AsyncApi";
import type {Request, Response, NextFunction} from "express"

export const userController = {
    signup: (
        catchAsync(
            async (req:Request, res: Response, next: NextFunction) => {
                const {username, password} = req.body;
                const response = await userServices.signup(username,password);
                res.json({
                    message: "success",
                    data: response
                })
            }
        )
    ),
    signin: (
        catchAsync(
           async (req:Request, res: Response, next: NextFunction) => {
                const {username, password} = req.body;
                const response = await userServices.singin(username,password);
                 res.json({
                    message: "success",
                    data: response
                })
            }
        )
    )
}