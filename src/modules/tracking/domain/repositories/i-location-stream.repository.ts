import { LocationEntity } from "../entities/location.entity";

export interface ILocationStreamRepository {
  saveLiveLocation(location: LocationEntity): Promise<void>;
  getLiveLocation(userId: string): Promise<LocationEntity | null>;
}