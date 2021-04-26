import { Connection, createConnection } from "typeorm";

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
      synchronize: true,
      logging: false,
      connectTimeoutMS: 20000,
    });
  }
  return connection;
};
