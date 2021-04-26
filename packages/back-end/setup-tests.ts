import { createConnection } from "typeorm";

const sleep = () =>
  new Promise((res) => {
    setTimeout(res, 3000);
  });

void (async () => {
  await sleep();
  try {
    const connection = await createConnection({
      type: "postgres",
      username: "postgres",
      password: "password",
      port: 5433,
      entities: ["src/**/*.entity.ts"],
      synchronize: true,
    });
    await connection.query("SELECT 1");

    console.log("Connection has been setup for the Database!");
    await sleep();
  } catch (error) {
    console.error("Connection did not work for the Database!");
  }
})();
