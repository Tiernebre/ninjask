const PRODUCTION_NAME = "production";

export const isProduction = (): boolean => !!process.env.NODE_ENV && process.env.NODE_ENV.toLowerCase() === PRODUCTION_NAME.toLowerCase();
