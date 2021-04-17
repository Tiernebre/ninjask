import Koa from "koa";
import { Logger, PinoLogger } from "./logger";
import { loggingMiddleware } from "./logger/logging.middleware";
import cors from "@koa/cors";
import websockify from "koa-websocket";
import dotenv from "dotenv";
import "reflect-metadata";
import { injectDependencies } from "./dependency-injection";

dotenv.config();

const app = websockify(new Koa());
const logger: Logger = new PinoLogger();

app.use(
  cors({
    // not great CORS API design -- but we'll stick with it for now to get something we can iterate on. :)
    origin: "*",
  })
);
app.use(loggingMiddleware(logger));

app.ws.use((ctx) => {
  ctx.websocket.send("Hello World FROM WEB SOCKET LAND WOOO");
  ctx.websocket.on("message", (message) => {
    logger.info(`WebSocket Message Received: ${message.toString()}`);
    ctx.websocket.send("Thanks for saying hi back :)");
  });
});

void injectDependencies(logger).then((routers) => {
  routers.forEach((router) => {
    app.use(router.routes());
  });

  const port = Number(process.env.API_SERVER_PORT);
  app.listen(port, () => {
    logger.info(`Pokemon Random API Has Started on Port: ${port}`);
  });
});
