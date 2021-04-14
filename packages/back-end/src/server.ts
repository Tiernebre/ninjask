import Koa from "koa";
import { FetchHttpClient } from "./http/fetch-http-client";
import { HttpClient } from "./http/http-client";

const app = new Koa();

const testHttpClient: HttpClient = new FetchHttpClient(
  "https://jsonplaceholder.typicode.com"
);

// response
app.use(async (ctx) => {
  ctx.body = "Hello Koa UPDATED AGAIN hopefully it works";
  const testResponse = await testHttpClient.get("todos/1");
  console.log("Test HTTP Response: ", JSON.stringify(testResponse));
  ctx.body = JSON.stringify(testResponse);
});

export { app };
