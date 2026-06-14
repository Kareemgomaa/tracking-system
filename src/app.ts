import "reflect-metadata";
import express, { Application, Request, Response } from "express";
import cors from "cors";
import { useExpressServer, useContainer } from "routing-controllers";
import { container } from "tsyringe";
import { errorHandler } from "./common/middleware/error-handler";
import { NotFoundError } from "./common/errors/not-found.error";
import { TrackingController } from "./modules/tracking/presentation/http/tracking.controller";

useContainer(container);

const app: Application = express();

app.use(cors());
app.use(express.json());

useExpressServer(app, {
  defaultErrorHandler: false,
  controllers: [TrackingController],
});

app.get("/health", (req: Request, res: Response) => {
  res.status(200).json({ status: "UP", timestamp: new Date() });
});

app.get("/test-error", (req: Request, res: Response) => {
  throw new NotFoundError("Test Not Found Error");
});

app.use(errorHandler);

export default app;
