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
app.use(bodyParser());

void injectDependencies(app, logger).then((injectedApp) => {
  const port = Number(process.env.API_SERVER_PORT);

  if (process.env.NODE_ENV !== "production") {
    injectedApp.listen(port, () => {
      logger.info(`Pokemon Random API Has Started on Port: ${port}`);
    });
  } else {
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
    const credentials = {
      key,
      cert,
      ca,
    };
    const httpsServer = https.createServer(credentials, app.callback());
    httpsServer.listen(443, () => {
      logger.info(`Pokemon Random API Has Started HTTPS server on Port 443`);
    });
  }
});
