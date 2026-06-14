import { JsonController, Post, Body, HttpCode } from "routing-controllers";
import { injectable, inject } from "tsyringe";
import { z } from "zod";
import { UpdateLocationUseCase } from "../../application/use-cases/update-location.use-case";
import { ValidationError } from "../../../../common/errors/validation.error";

const updateLocationSchema = z.object({
  deviceId: z.string().min(1, "deviceId is required"),
  userId: z.string().min(1, "userId is required"),
  lat: z.number(),
  lng: z.number(),
  speed: z.number().min(0),
});

@injectable()
@JsonController("/api/v1/tracking")
export class TrackingController {
  constructor(
    @inject(UpdateLocationUseCase) private updateLocationUseCase: UpdateLocationUseCase
  ) {}

  @Post("/live")
  @HttpCode(200)
  async updateLocation(@Body() body: any) {
    const parseResult = updateLocationSchema.safeParse(body);

    if (!parseResult.success) {
      const formattedErrors = parseResult.error.issues.map((issue) => ({
        message: issue.message,
        field: issue.path.join("."),
      }));
      throw new ValidationError(formattedErrors);
    }

    const result = await this.updateLocationUseCase.execute(parseResult.data);

    return {
      success: true,
      message: "Live location updated successfully",
      data: result,
    };
  }
}
