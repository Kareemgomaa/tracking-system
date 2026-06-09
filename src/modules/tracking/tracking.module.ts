import { container } from "tsyringe";
import { FakeLocationStreamRepository } from "./infrastructure/persistence/fake-location-stream.repository";
import { SocketLocationStreamRepository } from "./infrastructure/persistence/socket-location-stream.repository";

export const registerTrackingModule = (): void => {
  container.registerSingleton<SocketLocationStreamRepository>(
    "ILocationStreamRepository",
    SocketLocationStreamRepository,
  );

  console.log("Tracking Module dependencies registered successfully.");
};
