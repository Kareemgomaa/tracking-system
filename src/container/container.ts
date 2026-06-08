import { registerRepositories } from "./register-repositories";
import { registerTrackingModule } from "../modules/tracking/tracking.module";

export const initContainer = (): void => {
  registerRepositories();

  registerTrackingModule();

  console.log("Dependency Injection Container initialized successfully.");
};
