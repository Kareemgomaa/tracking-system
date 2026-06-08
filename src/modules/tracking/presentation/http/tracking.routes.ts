import { Router } from "express";
import { TrackingController } from "./tracking.controller";

const trackingRouter = Router();
const controller = new TrackingController();


trackingRouter.post("/live", controller.updateLocation.bind(controller));

export { trackingRouter };