import { Coordinate } from "../value-objects/coordinate.value-object";

export interface LocationProps {
  id?: string;
  deviceId: string;
  userId: string;
  coordinate: Coordinate; 
  speed: number;
  updatedAt: Date;
}

export class LocationEntity {
  public readonly id?: string;
  public readonly deviceId: string;
  public readonly userId: string;
  public readonly coordinate: Coordinate;
  public readonly speed: number;
  public readonly updatedAt: Date;

  constructor(props: LocationProps) {
    this.id = props.id;
    this.deviceId = props.deviceId;
    this.userId = props.userId;
    this.coordinate = props.coordinate;
    this.speed = props.speed;
    this.updatedAt = props.updatedAt;
  }
}