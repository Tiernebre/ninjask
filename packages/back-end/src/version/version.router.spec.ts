import Koa from "koa";
import supertest from "supertest";
import { Server } from "http";
import Application from "koa";
import { object, when } from "testdouble";
import { VersionService } from "./version.service";
import { VersionRouter } from "./version.router";
import { Version } from "./version";
import { generateMockVersion } from "./version.mock";

describe("Version Router (integration)", () => {
  let app: Application;
  let server: Server;
  let request: supertest.SuperTest<supertest.Test>;
  let versionService: VersionService;
  let authMiddleware: jest.Mock;

  beforeAll(() => {
    app = new Koa();
    versionService = object<VersionService>();
    authMiddleware = jest.fn();
    const router = new VersionRouter(versionService, authMiddleware);
    app.use(router.routes());

    server = app.listen();

    request = supertest(server);
  });

  afterAll(() => {
    server.close();
  });

  describe("GET /versions", () => {
    const uri = "/versions";

    it("returns with 200 OK status", async () => {
      const versions: Version[] = [generateMockVersion()];
      when(versionService.getAll()).thenResolve(versions);
      const response = await request.get(uri).send();
      expect(response.status).toEqual(200);
    });

    it("returns with found challenges in the response body", async () => {
      const versions: Version[] = [generateMockVersion()];
      when(versionService.getAll()).thenResolve(versions);
      const response = await request.get(uri).send();
      const body = response.body as Version[];
      expect(body).toHaveLength(versions.length);
      expect(body[0].id).toEqual(versions[0].id);
    });
  });
});
