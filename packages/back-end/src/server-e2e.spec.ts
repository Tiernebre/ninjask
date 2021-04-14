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

  it("returns with 2xx successful status", (done) => {
    void request
      .get("/")
      .expect(200)
      .end((err, res) => {
        if (err) throw err;

        expect(res.status).toEqual(200);
        done();
      });
  });
});
