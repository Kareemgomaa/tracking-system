import http from "http";
import app from "./app";
import { env } from "./common/config/env";
import { initContainer } from "./container/container";
import { SocketServer } from "./modules/tracking/infrastructure/socket/socket.server";
import { RabbitMQConsumer } from "./modules/tracking/infrastructure/messaging/rabbitmq.consumer";
import mongoose from "mongoose";

const startMicroservice = async () => {
  try {
    initContainer();

    try {
      await mongoose.connect(env.MONGO_URI, { serverSelectionTimeoutMS: 5000 });
      console.log("Database connected successfully to Tracking DB.");
    } catch (dbError) {
      console.warn(
        "MongoDB connection failed, continuing without database:",
        (dbError as Error).message,
      );
    }

    const server = http.createServer(app);
    SocketServer.init(server);

    try {
      await RabbitMQConsumer.init(env.RABBITMQ_URL);
    } catch (mqError) {
      console.warn(
        "RabbitMQ connection failed, continuing without queue:",
        (mqError as Error).message,
      );
    }

    server.listen(env.PORT, () => {
      console.log(`Tracking Microservice is running on port ${env.PORT}`);
    });
  } catch (error) {
    console.error("Microservice failed to start:", error);
    process.exit(1);
  }
};

startMicroservice();
