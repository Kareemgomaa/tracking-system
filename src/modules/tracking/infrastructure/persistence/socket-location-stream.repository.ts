import { injectable } from "tsyringe";
import { ILocationStreamRepository } from "../../domain/repositories/i-location-stream.repository";
import { LocationEntity } from "../../domain/entities/location.entity";
import { SocketServer } from "../socket/socket.server";

@injectable()
export class SocketLocationStreamRepository implements ILocationStreamRepository {
  async saveLiveLocation(location: LocationEntity): Promise<void> {
    const livePayload = {
      deviceId: location.deviceId,
      userId: location.userId,
      lat: location.coordinate.lat,
      lng: location.coordinate.lng,
      speed: location.speed,
      address: location.address,
      postalCode: location.postalCode,
      updatedAt: location.updatedAt,
    };

    console.log(
      `[Socket Stream] Broadcasting live location for device: ${location.deviceId}`,
    );

    SocketServer.emitToRoom(
      `device:${location.deviceId}`,
      "location-updated",
      livePayload,
    );
  }

  async getLiveLocation(userId: string): Promise<LocationEntity | null> {
    return null;
  }
}
