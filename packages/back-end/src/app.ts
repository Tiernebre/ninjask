import Koa from "koa";
import { Logger, PinoLogger, loggingMiddleware } from "./logger";
import cors from "@koa/cors";
import websockify from "koa-websocket";
import dotenv from "dotenv";
import "reflect-metadata";
import { injectDependencies } from "./dependency-injection";
import bodyParser from "koa-bodyparser";
import fs from "fs";
import https from "https";
import KoaWebsocket from "koa-websocket";
import { isProduction } from "./environment";
import { ContextState } from "./types/state";
import { errorMiddleware } from "./error/error.middleware";

dotenv.config();

const app = new Koa();
const logger: Logger = new PinoLogger();

app.use(errorMiddleware);
app.use(
  cors({
    origin: process.env.API_CORS_ORIGIN,
    credentials: true,
  })
);
app.use(loggingMiddleware(logger));
app.use(bodyParser());

const getHttpsCredentials = (): https.ServerOptions => {
  const key = fs.readFileSync(
    "/etc/letsencrypt/live/api.ninjask.app/privkey.pem",
    "utf8"
  );
  const cert = fs.readFileSync(
    "/etc/letsencrypt/live/api.ninjask.app/cert.pem",
    "utf8"
  );
  const ca = fs.readFileSync(
    "/etc/letsencrypt/live/api.ninjask.app/chain.pem",
    "utf8"
  );
  return {
    key,
    cert,
    ca,
  };
};

let sockifiedApp: KoaWebsocket.App<ContextState>;
if (isProduction()) {
  sockifiedApp = websockify<ContextState>(
    app,
    undefined,
    getHttpsCredentials()
  );
} else {
  sockifiedApp = websockify<ContextState>(app);
}

void injectDependencies(sockifiedApp, logger).then((injectedApp) => {
  const port = Number(process.env.API_SERVER_PORT);

  if (process.env.NODE_ENV !== "production") {
    injectedApp.listen(port, () => {
      logger.info(`Ninjask Back-End API Has Started on HTTP Port: ${port}`);
    });
  } else {
    injectedApp.listen(443, () => {
      logger.info(`Ninjask Back-End API Has Started HTTPS server on Port 443`);
    });
  }
});
