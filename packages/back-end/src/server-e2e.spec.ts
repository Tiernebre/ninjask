import { app } from "./server";
import supertest from "supertest";
import { Server } from "http";

describe("Server (E2E)", () => {
  let server: Server;
  let request: supertest.SuperTest<supertest.Test>;

  beforeAll(() => {
    server = app.listen();
    request = supertest(server);
  });

  afterAll(() => {
    server.close();
  });

  it('returns "Hello Koa" in the response', (done) => {
    void request
      .get("/")
      .expect(200)
      .end((err, res) => {
        if (err) throw err;

        expect(res.text).toEqual("Hello Koa");
        done();
      });
  });
});
