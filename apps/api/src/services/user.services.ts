import "dotenv/config";
import { db, NotFoundError, ValidationError } from "@repo/db";
import { z } from "zod";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
class UserServices {
  async signup(_username: string, _password: string) {
    const zodObj = z.object({
      username: z.string().max(20).min(3),
      password: z.string().max(50).min(8),
    });
    const parsed = zodObj.safeParse({
      username: _username,
      password: _password,
    });
    if (!parsed.success) {
      throw new ValidationError(
        undefined,
        parsed.error.issues.map((issue) => ({
          type: issue.path,
          message: issue.message,
        })),
      );
    }
    const { username, password } = parsed.data;
    const hashed = await bcrypt.hash(
      password,
      Number(process.env.SALT_ROUNDS as string),
    );
    const response = await db.orm.public.User.create({
      username,
      password: hashed,
    });
    if (!response) {
      throw new ValidationError();
    }
    const token = jwt.sign({user_id: response.id}, process.env.JWT_SECRET as string);
    return {
      id: response.id,
      username: response.username,
      createdAt: response.createdAt,
      token,
    };
  }

  async singin(_username: string, _password: string) {
    const zodObj = z.object({
      username: z.string().max(20).min(3),
      password: z.string().max(50).min(8),
    });
    const parsed = zodObj.safeParse({
      username: _username,
      password: _password,
    });
    if (!parsed.success) {
      throw new ValidationError(
        undefined,
        parsed.error.issues.map((issue) => ({
          type: issue.path,
          message: issue.message,
        })),
      );
    }
    const { username, password } = parsed.data;

    const response = await db.orm.public.User.first({username})

    if (!response) {
      throw new NotFoundError();
    }
    const hashed_password = response.password;
    const match = await bcrypt.compare(password, hashed_password);
    if (!match) {
      throw new ValidationError();
    }

    const token = jwt.sign({user_id: response.id}, process.env.JWT_SECRET as string);
    return {
      id: response.id,
      username: response.username,
      createdAt: response.createdAt,
      token,
    };
  }
}

export const userServices = new UserServices();
