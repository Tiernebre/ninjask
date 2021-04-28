import Koa from "koa";
import Application from "koa";
import bodyParser from "koa-bodyparser";
import { Server } from "http";
import supertest from "supertest";
import { object, when } from "testdouble";
import { generateRandomString } from "../random";
import { generateMockUser } from "./user.mock";
import { UserRouter } from "./user.router";
import { UserService } from "./user.service";
import { CREATED } from "http-status";

describe("User Router (integration)", () => {
  const username = "admin";
  const password = "password";

  let app: Application;
  let server: Server;
  let request: supertest.SuperTest<supertest.Test>;
  let userService: UserService;

  beforeAll(() => {
    app = new Koa();
    app.use(bodyParser());
    userService = object<UserService>();
    const router = new UserRouter(userService, username, password);
    app.use(router.routes());

    server = app.listen();

    request = supertest(server);
  });

  afterAll(() => {
    server.close();
  });

  describe("constructor", () => {
    it.each(["", undefined])(
      "errors out if the username provided is %p",
      (errorUsername) => {
        expect(
          () => new UserRouter(userService, errorUsername, password)
        ).toThrowError();
      }
    );

    it.each(["", undefined])(
      "errors out if the password provided is %p",
      (errorPassword) => {
        expect(
          () => new UserRouter(userService, username, errorPassword)
        ).toThrowError();
      }
    );
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
      const response = await request
        .post(uri)
        .auth(username, password)
        .send(createUserRequest);
      expect(response.status).toEqual(CREATED);
    });

    it("returns with the a user as the response", async () => {
      const createUserRequest = {
        nickname: generateRandomString(),
        password: generateRandomString(),
      };
      const expected = generateMockUser();
      when(userService.createOne(createUserRequest)).thenResolve(expected);
      const response = await request
        .post(uri)
        .auth(username, password)
        .send(createUserRequest);
      expect(response.body).toEqual(expected.toJSON());
    });
  });
});
