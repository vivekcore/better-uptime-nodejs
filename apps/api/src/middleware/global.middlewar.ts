import type { Request, Response, NextFunction } from "express";
import { AppError, isStructuredError } from "@repo/db";

const isUniqueConstraintViolation = (error: unknown): boolean =>
  typeof error === "object" &&
  error !== null &&
  "kind" in error &&
  error.kind === "sql_query" &&
  "sqlState" in error &&
  error.sqlState === "23505";

export const errorHandler = (
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (res.headersSent) {
    return next(err);
  }

  console.error("Error encountered:", err);

  let statusCode = 500;
  let message = "Something went wrong. Please try again later.";
  let details: unknown;

  if (err instanceof AppError) {
    statusCode = err.statusCode;
    message = err.message;
    details = err.details;
  } else if (isUniqueConstraintViolation(err)) {
    statusCode = 409;
    message = "A record with this value already exists.";
  } else if (isStructuredError(err)) {
    // Prisma 8: inspect the structured error code.
    // Map the codes emitted by your installed database facade here.
    console.error("Prisma error code:", err.code);

    message = "A database operation failed.";

    // Do not expose internal database error details to clients.
  } else if (err instanceof Error) {
    // Unexpected errors remain internal server errors.
    console.error(err.message);
  }

  return res.status(statusCode).json({
    success: false,
    message,
    ...(details !== undefined && { details }),
    ...(process.env.NODE_ENV === "development" &&
      err instanceof Error && { stack: err.stack }),
  });
};
