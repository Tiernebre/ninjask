export interface Logger {
  /**
   * Logs out a message using information level logging.
   *
   * @param message The message to log.
   */
  info(message: string): void;

  /**
   * Logs out an error level message.
   * @param message The message to log.
   */
  error(message: string): void;
}
