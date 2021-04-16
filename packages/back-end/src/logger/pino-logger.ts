import { Logger } from "./logger";
import Pino from "pino";

export class PinoLogger implements Logger {
  pino: Pino.Logger;

  constructor() {
    this.pino = Pino();
  }

  info(message: string): void {
    this.pino.info(message);
  }
}
