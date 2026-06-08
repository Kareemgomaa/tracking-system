import { AppError } from "./app-error";

export class ValidationError extends AppError {
  readonly statusCode = 400;

  constructor(public errors: { message: string; field?: string }[]) {
    super("Validation failed");
  }

  serializeErrors() {
    return this.errors;
  }
}
