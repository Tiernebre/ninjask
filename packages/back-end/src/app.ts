import Koa from "koa";
import { Logger, PinoLogger } from "./logger";
import { loggingMiddleware } from "./logger/logging.middleware";
import cors from "@koa/cors";
import websockify from "koa-websocket";
import dotenv from "dotenv";
import "reflect-metadata";
import { injectDependencies } from "./dependency-injection";
import bodyParser from "koa-bodyparser";
import fs from "fs";
import https from "https";
import KoaWebsocket from "koa-websocket";

dotenv.config();

const app = new Koa();
const logger: Logger = new PinoLogger();

app.use(
  cors({
    // not great CORS API design -- but we'll stick with it for now to get something we can iterate on. :)
    origin: "*",
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

let sockifiedApp: KoaWebsocket.App;
if (process.env.NODE_ENV === "production") {
  sockifiedApp = websockify(app, undefined, getHttpsCredentials());
} else {
  sockifiedApp = websockify(app);
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
