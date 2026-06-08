import { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/app-error";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  if (err instanceof AppError) {
    res.status(err.statusCode).json({
      success: false,
      errors: err.serializeErrors(),
    });
    return;
  }

  console.error("Unexpected Error:", err);
  res.status(500).json({
    success: false,
    errors: [{ message: "Something went wrong on the server" }],
  });
};