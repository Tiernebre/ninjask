import Router from "@koa/router";
import { CreateUserRequest } from "./create-user-request";
import { UserService } from "./user.service";
import { CREATED } from "http-status";
import auth from "koa-basic-auth";

export class UserRouter extends Router {
  private readonly username: string;
  private readonly password: string;

  constructor(
    private readonly userService: UserService,
    username?: string,
    password?: string
  ) {
    super();

    if (!username || !password) {
      throw new Error(
        "An Authentication Credential Configuration is required for setting up the User Router."
      );
    }

    this.username = username;
    this.password = password;
    this.setupRoutes();
  }

  private setupRoutes(): void {
    this.post(
      "/users",
      auth({ name: this.username, pass: this.password }),
      async (ctx) => {
        const createdUser = await this.userService.createOne(
          ctx.request.body as CreateUserRequest
        );
        ctx.body = createdUser;
        ctx.status = CREATED;
      }
    );
  }
}
