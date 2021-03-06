import Koa from "koa";
import Application from "koa";
import bodyParser from "koa-bodyparser";
import { Server } from "http";
import supertest from "supertest";
import { object, verify, when } from "testdouble";
import { generateRandomString } from "../random";
import { generateMockUser } from "./user.mock";
import { UserRouter } from "./user.router";
import { UserService } from "./user.service";
import { CREATED } from "http-status";
import { createAdminAuthenticationMiddleware } from "../middleware";

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
    const router = new UserRouter(
      userService,
      createAdminAuthenticationMiddleware(username, password)
    );
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

    it("returns with 4xx error if the credentials provided are missing", async () => {
      const createUserRequest = {
        nickname: generateRandomString(),
        password: generateRandomString(),
      };
      const response = await request.post(uri).send(createUserRequest);
      expect(response.status).toBeGreaterThanOrEqual(400);
      expect(response.status).toBeLessThan(500);
      verify(userService.createOne(createUserRequest), { times: 0 });
    });

    it("returns with 4xx error if the credentials provided are incorrect (username)", async () => {
      const createUserRequest = {
        nickname: generateRandomString(),
        password: generateRandomString(),
      };
      const response = await request
        .post(uri)
        .auth(username + "foo", password)
        .send(createUserRequest);
      expect(response.status).toBeGreaterThanOrEqual(400);
      expect(response.status).toBeLessThan(500);
      verify(userService.createOne(createUserRequest), { times: 0 });
    });

    it("returns with 4xx error if the credentials provided are incorrect (password)", async () => {
      const createUserRequest = {
        nickname: generateRandomString(),
        password: generateRandomString(),
      };
      const response = await request
        .post(uri)
        .auth(username, password + "foo")
        .send(createUserRequest);
      expect(response.status).toBeGreaterThanOrEqual(400);
      expect(response.status).toBeLessThan(500);
      verify(userService.createOne(createUserRequest), { times: 0 });
    });
  });
});
