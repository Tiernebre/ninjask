import Koa from "koa";
import auth from "koa-basic-auth";

export const createAdminAuthenticationMiddleware = (
  username?: string,
  password?: string
): Koa.Middleware => {
  if (!username || !password) {
    throw new Error(
      "Username and Password Need to be Provided for Wiring Admin Authentication Middleware."
    );
  }

  return auth({ name: username, pass: password });
};
