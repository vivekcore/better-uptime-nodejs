import { UnauthorizedError, ValidationError } from "@repo/db";
import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken"

export const auth_middleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const string = req.headers["authorization"];
    if (!string) {
      return next(new UnauthorizedError());
    }
    const token = string.split(" ")[1];
    if(!token) {
        return next(new UnauthorizedError());
    }

    const decode = jwt.decode(token);
    const user_id = (decode as jwt.JwtPayload).user_id as string;
    req.user_id = user_id;
    next();
  } catch (error) {
    next(new ValidationError())
  }
};
