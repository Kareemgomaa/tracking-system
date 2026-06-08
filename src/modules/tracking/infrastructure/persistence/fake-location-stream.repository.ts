import { injectable } from "tsyringe";
import { ILocationStreamRepository } from "../../domain/repositories/i-location-stream.repository";
import { LocationEntity } from "../../domain/entities/location.entity";

@injectable()
export class FakeLocationStreamRepository implements ILocationStreamRepository {
  async saveLiveLocation(location: LocationEntity): Promise<void> {
    console.log(`[Fake DB Save] Device: ${location.deviceId} | Lat: ${location.coordinate.lat}, Lng: ${location.coordinate.lng} | Speed: ${location.speed}km/h`);
  }

  async getLiveLocation(userId: string): Promise<LocationEntity | null> {
    console.log(`[Fake DB Fetch] Fetching location for user: ${userId}`);
    return null;
  }
}