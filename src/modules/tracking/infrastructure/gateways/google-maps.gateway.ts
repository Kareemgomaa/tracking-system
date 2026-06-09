import axios from "axios";
import { env } from "../../../../common/config/env";

export class GoogleMapsGateway {
  private readonly apiKey = env.GOOGLE_MAPS_API_KEY;

  async getAddressFromCoords(
    lat: number,
    lng: number,
  ): Promise<{ address: string; postalCode: string | null }> {
    try {
      const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${this.apiKey}&language=ar`;
      const response = await axios.get(url);

      if (response.data.status === "OK" && response.data.results.length > 0) {
        const firstResult = response.data.results[0];
        const address = firstResult.formatted_address;

        const addressComponents = firstResult.address_components;
        const postalCodeComponent = addressComponents.find((component: any) =>
          component.types.includes("postal_code"),
        );

        return {
          address,
          postalCode: postalCodeComponent
            ? postalCodeComponent.long_name
            : null,
        };
      }

      return { address: "Unknown Location", postalCode: null };
    } catch (error) {
      console.error("Google Maps Geocoding Error:", error);
      return { address: "Unknown Location", postalCode: null };
    }
  }
}
