import { Server as HttpServer } from "http";
import { Server as SocketIOServer, Socket } from "socket.io";

export class SocketServer {
  private static io: SocketIOServer | null = null;

  public static init(httpServer: HttpServer): SocketIOServer {
    if (this.io) {
      return this.io;
    }

    this.io = new SocketIOServer(httpServer, {
      cors: {
        origin: "*",
        methods: ["GET", "POST"],
      },
    });

    this.io.on("connection", (socket: Socket) => {
      console.log(`New client connected to Socket.io: ${socket.id}`);

      socket.on("join-device-room", (deviceId: string) => {
        socket.join(`device:${deviceId}`);
        console.log(`Client ${socket.id} joined room: device:${deviceId}`);
      });

      socket.on("disconnect", () => {
        console.log(`Client disconnected: ${socket.id}`);
      });
    });

    console.log("Socket.io Server initialized successfully.");
    return this.io;
  }

  public static emitToRoom(room: string, event: string, data: any): void {
    if (!this.io) {
      console.warn("Socket.io is not initialized yet!");
      return;
    }
    this.io.to(room).emit(event, data);
  }
}
