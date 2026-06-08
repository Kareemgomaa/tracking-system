import { ValidationError } from "../../../../common/errors/validation.error";

export class Coordinate {
  constructor(
    public readonly lat: number,
    public readonly lng: number
  ) {
    this.validate();
  }

  private validate(): void {
    if (this.lat < -90 || this.lat > 90 || this.lng < -180 || this.lng > 180) {
      throw new ValidationError([
        { message: "Invalid latitude or longitude values", field: "coordinate" }
      ]);
    }
  }
}