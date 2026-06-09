import { Request, Response, NextFunction } from "express";
import { container } from "tsyringe";
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

export class TrackingController {
  async updateLocation(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const parseResult = updateLocationSchema.safeParse(req.body);
      if (!parseResult.success) {
        const formattedErrors = parseResult.error.issues.map((issue) => ({
          message: issue.message,
          field: issue.path.join("."),
        }));

        throw new ValidationError(formattedErrors);
      }

      const useCase = container.resolve(UpdateLocationUseCase);
      const result = await useCase.execute(parseResult.data);

      res.status(200).json({
        success: true,
        message: "Live location updated successfully",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }
}
