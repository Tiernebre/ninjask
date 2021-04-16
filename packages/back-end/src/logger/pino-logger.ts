import { Logger } from "./logger";

export class PinoLogger implements Logger {
  info(message: string): void {
    throw new Error("Method not implemented.");
  }
}