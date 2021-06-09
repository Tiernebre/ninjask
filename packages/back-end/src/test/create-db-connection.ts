import { Connection, createConnection } from "typeorm";
import { SnakeNamingStrategy } from "typeorm-naming-strategies";

let connection: Connection | null = null;

const sleep = () => new Promise((res) => setTimeout(res, 1000));

export const establishDbConnection = async (): Promise<Connection> => {
  if (!connection) {
    await sleep();
    connection = await createConnection({
      type: "postgres",
      username: "postgres",
      password: "password",
      port: 5433,
      entities: ["src/**/*.entity.ts"],
      migrations: ["src/db/migrations/*.ts"],
      synchronize: false,
      logging: false,
      connectTimeoutMS: 20000,
      namingStrategy: new SnakeNamingStrategy(),
    });
  }

  const queryRunner = connection.createQueryRunner()
  await queryRunner.dropDatabase("pokemon-league", true)
  await queryRunner.createDatabase("pokemon-league", true)
  await connection.runMigrations();
  return connection;
};
