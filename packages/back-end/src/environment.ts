const PRODUCTION_NAME = 'Production'

export const isProduction = () => process.env.NODE_ENV === PRODUCTION_NAME
