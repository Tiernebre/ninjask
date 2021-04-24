const PRODUCTION_NAME = "Production";

export const isProduction = (): boolean => process.env.NODE_ENV === PRODUCTION_NAME;
