import axios from "axios";
import { env } from "../../../../common/config/env";

export class GoogleMapsGateway {
  private readonly apiKey = env.GOOGLE_MAPS_API_KEY;

  async getAddressFromCoords(lat: number, lng: number): Promise<string> {
    try {
      const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${this.apiKey}&language=ar`;
      const response = await axios.get(url);

      if (response.data.status === "OK" && response.data.results.length > 0) {
        return response.data.results[0].formatted_address;
      }

      return "Unknown Location";
    } catch (error) {
      console.error("Google Maps Geocoding Error:", error);
      return "Unknown Location";
    }
  }
}
