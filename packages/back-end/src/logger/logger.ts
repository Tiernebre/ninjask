export interface Logger {
  /**
   * Logs out a message using information level logging.
   * 
   * @param message The message to log.
   */
  info(message: string): void;
}