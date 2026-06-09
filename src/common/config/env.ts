import dotenv from "dotenv";
import { z } from "zod";
import path from "path";

dotenv.config({ path: path.resolve(__dirname, "./.env") });

const envSchema = z.object({
  PORT: z
    .string()
    .transform((val) => parseInt(val, 10))
    .default(3000),
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),
  GOOGLE_MAPS_API_KEY: z.string().min(1, "Google Maps API Key is required"),
});

const envParse = envSchema.safeParse(process.env);

if (!envParse.success) {
  console.error("Invalid environment variables:", envParse.error.format());
  process.exit(1);
}

export const env = envParse.data;
