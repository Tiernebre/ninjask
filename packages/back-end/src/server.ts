import Koa from "koa";

const app = new Koa();

// response
app.use((ctx) => {
  ctx.body = "Hello Koa UPDATED";
});

export { app };
