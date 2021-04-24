const PRODUCTION_NAME = "production";

export const isProduction = (): boolean => process.env.NODE_ENV === PRODUCTION_NAME;
