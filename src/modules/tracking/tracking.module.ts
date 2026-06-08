import { container } from "tsyringe";
import { FakeLocationStreamRepository } from "./infrastructure/persistence/fake-location-stream.repository";

export const registerTrackingModule = (): void => {
  container.registerSingleton<FakeLocationStreamRepository>(
    "ILocationStreamRepository",
    FakeLocationStreamRepository,
  );

  console.log("Tracking Module dependencies registered successfully.");
};
