import http from "http";
import app from "./app";
import { env } from "./common/config/env";
import { initContainer } from "./container/container";
import { SocketServer } from "./modules/tracking/infrastructure/socket/socket.server";

const PORT = env.PORT;

initContainer();

const server = http.createServer(app);

SocketServer.init(server);

server.listen(PORT, () => {
  console.log(
    `Server & Socket.io are running in ${env.NODE_ENV} mode on port ${PORT}`,
  );
});
