import { AppError } from "./app-error";

export class NotFoundError extends AppError {
  readonly statusCode = 404;

  constructor(message: string = "Resource Not Found") {
    super(message);
  }
  serializeErrors() {
    return [{ message: this.message }];
  }
}
