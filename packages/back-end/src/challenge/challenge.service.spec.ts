import { createConnection, getRepository } from "typeorm";
import { ChallengeEntity } from "./challenge.entity";
import { ChallengeService } from "./challenge.service";

describe("ChallengeService", () => {
  let challengeService: ChallengeService;

  beforeAll(async () => {
    const connection = await createConnection({
      type: "postgres",
      username: "postgres",
      password: "password",
      port: 5433,
      entities: ["src/**/*.entity.ts"],
      synchronize: true,
    });
    await connection.query("SELECT 1");
  });

  beforeEach(() => {
    challengeService = new ChallengeService(getRepository(ChallengeEntity));
  });

  it("does a thing", () => {
    void challengeService.getAllForCurrentUser({ id: 1, accessKey: "" });
  });
});
