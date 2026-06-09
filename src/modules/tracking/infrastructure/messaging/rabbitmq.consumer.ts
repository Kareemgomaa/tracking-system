import amqp, { ChannelModel, Channel, ConsumeMessage } from "amqplib";
import { container } from "tsyringe";
import { UpdateLocationUseCase } from "../../application/use-cases/update-location.use-case";

export class RabbitMQConsumer {
  private static connection: ChannelModel;
  private static channel: Channel;
  private static readonly QUEUE_NAME = "tracking_location_queue";

  public static async init(rabbitUrl: string): Promise<void> {
    try {
      this.connection = await amqp.connect(rabbitUrl);
      this.channel = await this.connection.createChannel();

      await this.channel.assertQueue(this.QUEUE_NAME, { durable: true });
      console.log(`RabbitMQ Connected. Listening to queue: ${this.QUEUE_NAME}`);

      this.channel.consume(
        this.QUEUE_NAME,
        async (msg: ConsumeMessage | null) => {
          if (msg !== null) {
            try {
              const content = JSON.parse(msg.content.toString());
              console.log(
                `RabbitMQ Message Received for device: ${content.deviceId}`,
              );

              const useCase = container.resolve(UpdateLocationUseCase);
              await useCase.execute({
                deviceId: content.deviceId,
                userId: content.userId,
                lat: content.lat,
                lng: content.lng,
                speed: content.speed,
              });

              this.channel.ack(msg);
            } catch (error) {
              console.error("Error processing queue message:", error);
              this.channel.nack(msg, false, true);
            }
          }
        },
      );
    } catch (error) {
      console.error(" RabbitMQ Initialization Error:", error);
      throw error;
    }
  }
}
