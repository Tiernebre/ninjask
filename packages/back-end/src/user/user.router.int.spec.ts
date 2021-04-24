import Koa from "koa";
import Application from "koa";
import bodyParser from "koa-bodyparser";
import { Server } from "http";
import supertest from "supertest";
import { object, when } from "testdouble";
import { generateRandomString } from "../random";
import { generateMockUser } from "../user/user.mock";
import { UserRouter } from "../user/user.router";
import { UserService } from "../user/user.service";
import { CREATED } from "http-status";

describe("User Router (integration)", () => {
  let app: Application;
  let server: Server;
  let request: supertest.SuperTest<supertest.Test>;
  let userService: UserService;

  beforeAll(() => {
    app = new Koa();
    app.use(bodyParser());
    userService = object<UserService>();
    const router = new UserRouter(userService);
    app.use(router.routes());

    server = app.listen();

    request = supertest(server);
  });

  afterAll(() => {
    server.close();
  });

  describe("POST /users", () => {
    const uri = "/users";

    it("returns with 201 CREATED status", async () => {
      const createUserRequest = {
        nickname: generateRandomString(),
        password: generateRandomString(),
      };
      when(userService.createOne(createUserRequest)).thenResolve(
        generateMockUser()
      );
      const response = await request.post(uri).send(createUserRequest);
      expect(response.status).toEqual(CREATED);
    });

    it("returns with the a user as the response", async () => {
      const createUserRequest = {
        nickname: generateRandomString(),
        password: generateRandomString(),
      };
      const expected = generateMockUser();
      when(userService.createOne(createUserRequest)).thenResolve(expected);
      const response = await request.post(uri).send(createUserRequest);
      expect(response.body).toEqual(expected.toJSON());
    });
  });
});
