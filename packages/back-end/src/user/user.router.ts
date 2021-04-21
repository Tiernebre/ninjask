import Router from "@koa/router";
import { CreateUserRequest } from "./create-user-request";
import { UserService } from "./user.service";
import { CREATED } from "http-status";

export class UserRouter extends Router {
  constructor(private readonly userService: UserService) {
    super();
    this.setupRoutes();
  }

  private setupRoutes(): void {
    this.post("/users", async (ctx) => {
      const createdUser = await this.userService.createOne(
        ctx.request.body as CreateUserRequest
      );
      ctx.body = createdUser;
      ctx.status = CREATED;
    });
  }
}
