import { inject, injectable } from "tsyringe";
import { ILocationStreamRepository } from "../../domain/repositories/i-location-stream.repository";
import { LocationEntity } from "../../domain/entities/location.entity";
import { Coordinate } from "../../domain/value-objects/coordinate.value-object";
import { GoogleMapsGateway } from "../../infrastructure/gateways/google-maps.gateway";

export interface UpdateLocationDTO {
  deviceId: string;
  userId: string;
  lat: number;
  lng: number;
  speed: number;
}

export interface UpdateLocationResult {
  deviceId: string;
  userId: string;
  lat: number;
  lng: number;
  speed: number;
  address: string;
  updatedAt: Date;
}

@injectable()
export class UpdateLocationUseCase {
  private googleMapsGateway = new GoogleMapsGateway();

  constructor(
    @inject("ILocationStreamRepository")
    private locationRepo: ILocationStreamRepository,
  ) {}

  async execute(dto: UpdateLocationDTO): Promise<UpdateLocationResult> {
    const coordinate = new Coordinate(dto.lat, dto.lng);

    const address = await this.googleMapsGateway.getAddressFromCoords(
      dto.lat,
      dto.lng,
    );

    const locationEntity = new LocationEntity({
      deviceId: dto.deviceId,
      userId: dto.userId,
      coordinate: coordinate,
      speed: dto.speed,
      address: address,
      updatedAt: new Date(),
    });

    await this.locationRepo.saveLiveLocation(locationEntity);

    return {
      deviceId: dto.deviceId,
      userId: dto.userId,
      lat: dto.lat,
      lng: dto.lng,
      speed: dto.speed,
      address: address,
      updatedAt: locationEntity.updatedAt,
    };
  }
}
